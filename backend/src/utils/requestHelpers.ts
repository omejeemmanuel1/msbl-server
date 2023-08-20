import { RequestDocument, WorkflowStage } from '../models/requests';
import {
  SendClientRequestStatus,
  SendInitiatorRequestStatus,
  SendOperationsRequestStatus,
} from '../utils/notifications';
import { User, UserDocument } from '../models/users';

export const handleRequestUpdates = async (
  request: RequestDocument,
  initiator: UserDocument,
  updatedStage: WorkflowStage,
) => {
  // Send status of request to client
  await SendClientRequestStatus(
    request.clientEmail,
    request.clientName,
    updatedStage,
  );

  // Send status of request to Initiators
  await SendInitiatorRequestStatus(
    initiator.email,
    initiator.lastName,
    updatedStage,
  );

  // Find Operations
  const operations = await User.find({ role: 'operations' });

  // Loop through each operations user and send email
  for (const operation of operations) {
    await SendOperationsRequestStatus(
      operation.email,
      `${operation.firstName} ${operation.lastName}`,
      updatedStage,
    );
  }
};
