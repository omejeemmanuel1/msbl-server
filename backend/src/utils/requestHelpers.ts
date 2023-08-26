import { RequestDocument, WorkflowStage } from '../models/requests';
import {
  SendReminder,
  SendClientStatusCompleted,
  SendClientStatusProcessing,
  SendInitiatorRequestStatus,
  SendOperationsRequestStatus,
} from '../utils/notifications';
import { User, UserDocument } from '../models/users';

export const handleRequestUpdates = async (
  request: RequestDocument | any,
  initiator: UserDocument,
  updatedStage: WorkflowStage,
) => {
  // Send status of request to client upon creation or addition of comment by Operations or an Initiator
  if (
    updatedStage === WorkflowStage.Draft ||
    updatedStage === WorkflowStage.Approval ||
    updatedStage === WorkflowStage.Declined
  ) {
    await SendClientStatusProcessing(
      request.clientEmail,
      request.clientName,
      request.type,
    );
  }

  // Send status of request to client upon marking request as completed by an Initiator
  if (updatedStage === WorkflowStage.Completed) {
    await SendClientStatusCompleted(
      request.clientEmail,
      request.clientName,
      request.type,
    );
  }

  // Send status of request to Initiators upon approval or declination by operations
  if (
    updatedStage === WorkflowStage.Draft ||
    updatedStage === WorkflowStage.Approval ||
    updatedStage === WorkflowStage.Declined
  ) {
    await SendInitiatorRequestStatus(
      initiator.email,
      initiator.lastName,
      request.clientName,
      request.type,
      updatedStage,
    );
  }

  if (updatedStage === WorkflowStage.Draft) {
    // Find Operations
    const operations = await User.find({ role: 'operations' });

    // Loop through each operations user and send email
    for (const operation of operations) {
      await SendOperationsRequestStatus(
        operation.email,
        `${operation.firstName} ${operation.lastName}`,
        request.clientName,
        request.type,
        updatedStage,
      );
    }
  }

  // Calculate the difference in months from the creation date
  const creationDate = request.createdAt;
  const currentDate = new Date();
  const timeDifferenceInMilliseconds =
    currentDate.getTime() - creationDate.getTime();
  const timeDifferenceInMonths =
    timeDifferenceInMilliseconds / (30 * 24 * 60 * 60 * 1000);

  if (
    (updatedStage === WorkflowStage.Review ||
      updatedStage === WorkflowStage.Approval) &&
    timeDifferenceInMonths >= 1
  ) {
    await SendReminder(
      initiator.email,
      initiator.lastName,
      request.clientName,
      request.type,
      updatedStage,
    );
  }
};
