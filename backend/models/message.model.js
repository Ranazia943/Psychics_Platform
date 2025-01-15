import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
	{
	  senderId: {
		type: mongoose.Schema.Types.ObjectId,
		refPath: 'senderModel', // Dynamically refer to the correct model
		required: true,
	  },
	  receiverId: {
		type: mongoose.Schema.Types.ObjectId,
		refPath: 'receiverModel', // Dynamically refer to the correct model
		required: true,
	  },
	  message: {
		type: String,
		required: true,
	  },
	},
	{ timestamps: true }
  );
  
  // Virtuals to specify the model references
  messageSchema.virtual('senderModel').get(function () {
	return this.senderId.modelName === 'Psychics' ? 'Psychics' : 'User';
  });
  
  messageSchema.virtual('receiverModel').get(function () {
	return this.receiverId.modelName === 'Psychics' ? 'Psychics' : 'User';
  });
  
  const Message = mongoose.model('Message', messageSchema);
  
export default Message;
