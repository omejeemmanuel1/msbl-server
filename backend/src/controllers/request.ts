import { Request, Response } from 'express';
import {
  RequestDocument,
  Requests,
  WorkflowStage,
  Comment,
} from '../models/requests';
import { requestValidator } from '../utils/utilities';
import { SendRequestStatusMail } from '../utils/notifications';
import { User } from '../models/users';
import { stringify } from 'csv-stringify';

export const createRequest = async (req: Request | any, res: Response) => {
  try {
    const {
      clientName,
      clientEmail,
      clientPhone,
      type,
      docURL,
      authURL,
      comments,
      narration,
    } = req.body;

    const { email } = req.user;

    // Validate request body
    const validationResult = requestValidator.validate(req.body);
    if (validationResult.error) {
      return res.status(400).json({
        error: validationResult.error.details[0].message,
      });
    }

    // Check user authentication
    if (!email) {
      return res
        .status(403)
        .json({ error: 'Authentication failed. User not authorized.' });
    }

    // Find initiator based on authenticated user's email
    const initiator = await User.findOne({ email });
    if (!initiator) {
      return res.status(403).json({ error: 'Initiator not found or invalid.' });
    }

    // Create new request
    const newRequest: RequestDocument = await Requests.create({
      clientName,
      clientEmail,
      clientPhone,
      initiator: `${initiator.firstName} ${initiator.lastName}`,
      type,
      stage: WorkflowStage.Draft,
      docURL,
      authURL,
      comments,
      narration,
      status: 'Started',
    });

    // Send status of request to client
    await SendRequestStatusMail(clientEmail, clientName, newRequest.stage);

    return res
      .status(200)
      .json({ message: 'Request created successfully', request: newRequest });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateRequest = async (req: Request | any, res: Response) => {
  try {
    const requestId = req.params.id;
    const { comment } = req.body;
    const { email } = req.user;

    // Check user authentication
    if (!email) {
      return res
        .status(403)
        .json({ error: 'Authentication failed. User not authorized.' });
    }

    // Find user making the comment based on authenticated user's email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(403).json({ error: 'User not found or invalid.' });
    }

    // Find the request to update
    const requestToUpdate = await Requests.findById(requestId);
    if (!requestToUpdate) {
      return res.status(404).json({ error: 'Request not found.' });
    }

    // Add the new comment to the comments array with timestamp and user
    const newComment: Comment = {
      text: comment,
      timestamp: new Date(),
      user: `${user.firstName} ${user.lastName}`,
    };

    requestToUpdate.comments.push(newComment);
    requestToUpdate.stage = WorkflowStage.Review;

    // Save the updated request
    await requestToUpdate.save();

    // Send status of request to client
    await SendRequestStatusMail(
      requestToUpdate.clientEmail,
      requestToUpdate.clientName,
      requestToUpdate.stage,
    );

    return res.status(200).json({ message: 'Request updated successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const searchRequest = async (req: Request, res: Response) => {
  try {
    const { status, type, date, name } = req.query;

    const query: any = {};

    if (status) {
      query.status = status;
    }

    if (type) {
      query.type = type;
    }

    if (date) {
      // Assuming the date is in ISO format (YYYY-MM-DD)
      query.createdAt = {
        $gte: new Date(`${date}T00:00:00Z`),
        $lt: new Date(`${date}T23:59:59Z`),
      };
    }

    if (name) {
      // Search by clientName or initiator
      query.$or = [
        { clientName: { $regex: name, $options: 'i' } },
        { initiator: { $regex: name, $options: 'i' } },
      ];
    }

    const searchResults = await Requests.find(query);

    return res.status(200).json({ results: searchResults });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Approve a request
export const approveRequest = async (req: Request | any, res: Response) => {
  try {
    const requestId = req.params.id;
    const { email } = req.user;

    // Check user authentication
    if (!email) {
      return res
        .status(403)
        .json({ error: 'Authentication failed. User not authorized.' });
    }

    // Find user making the approval based on authenticated user's email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(403).json({ error: 'User not found or invalid.' });
    }

    let updatedStatus = '';
    let updatedStage = '';
    if (user.role === 'checker') {
      updatedStatus = 'Pending';
      updatedStage = WorkflowStage.Approval;
    } else if (user.role === 'initiator') {
      updatedStatus = 'Approved';
      updatedStage = WorkflowStage.Completed;
    } else {
      return res.status(403).json({ error: 'Unauthorized role.' });
    }

    const updateFields = {
      stage: updatedStage,
      status: updatedStatus,
    };

    const options = { new: true };
    const updatedRequest: RequestDocument | null =
      await Requests.findByIdAndUpdate(
        requestId,
        { $set: updateFields },
        options,
      );

    if (!updatedRequest) {
      return res.status(404).json({ error: 'Request not found.' });
    }

    // Send status of request to client
    await SendRequestStatusMail(
      updatedRequest.clientEmail,
      updatedRequest.clientName,
      updatedRequest.stage,
    );

    return res.json(updatedRequest);
  } catch (error) {
    console.error('Error approving request:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Decline a request
export const declineRequest = async (req: Request | any, res: Response) => {
  try {
    const requestId = req.params.id;
    const { email } = req.user;

    // Check user authentication
    if (!email) {
      return res
        .status(403)
        .json({ error: 'Authentication failed. User not authorized.' });
    }

    // Find user making the decline based on authenticated user's email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(403).json({ error: 'User not found or invalid.' });
    }

    const updateFields = {
      stage: WorkflowStage.Declined,
      status: 'Declined',
    };

    const options = { new: true };
    const updatedRequest: RequestDocument | null =
      await Requests.findByIdAndUpdate(
        requestId,
        { $set: updateFields },
        options,
      );

    if (!updatedRequest) {
      return res.status(404).json({ error: 'Request not found.' });
    }

    // Send status of request to client
    await SendRequestStatusMail(
      updatedRequest.clientEmail,
      updatedRequest.clientName,
      updatedRequest.stage,
    );

    return res.json(updatedRequest);
  } catch (error) {
    console.error('Error declining request:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Fetch a specific request by ID
export const fetchRequest = async (req: Request, res: Response) => {
  try {
    const requestId = req.params.id;
    const request = await Requests.findById(requestId);
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }
    res.json(request);
  } catch (error) {
    console.error('Error fetching request:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Fetch all requests
export const fetchAllRequests = async (req: Request, res: Response) => {
  try {
    const allRequests = await Requests.find();

    res.json(allRequests);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const exportRequests = async (req: Request, res: Response) => {
  try {
    const { fromDate, toDate } = req.query;

    if (!fromDate || !toDate) {
      return res
        .status(400)
        .json({ error: 'Both fromDate and toDate are required.' });
    }

    const startDate = new Date(`${fromDate}T00:00:00Z`);
    const endDate = new Date(`${toDate}T23:59:59Z`);

    const requestsWithinDateRange = await Requests.find({
      createdAt: {
        $gte: startDate,
        $lte: endDate,
      },
    });

    if (requestsWithinDateRange.length === 0) {
      return res.status(404).json({
        message: 'No requests found within the specified date range.',
      });
    }
    const csvData = [];
    csvData.push([
      'Request ID',
      'Client Name',
      'Client Email',
      'Type',
      'Status',
    ]);

    requestsWithinDateRange.forEach((request) => {
      csvData.push([
        request._id.toString(),
        request.clientName,
        request.clientEmail,
        request.type,
        request.status,
      ]);
    });

    res.setHeader(
      'Content-Disposition',
      'attachment; filename="exported_requests.csv"',
    );
    res.setHeader('Content-Type', 'text/csv');

    const columns = [
      'Request ID',
      'Client Name',
      'Client Email',
      'Type',
      'Status',
    ];

    const csvStream = stringify(csvData, {
      header: true,
      columns: columns,
    });
    csvStream.pipe(res);
  } catch (error) {
    console.error('Error exporting requests:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
