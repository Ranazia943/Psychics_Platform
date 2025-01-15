import mongoose from "mongoose";

const AuraPageSchema = new mongoose.Schema({
    AuraBanner: {
        type: 'string',
    },
    video:{
        type: String,
        required: true,
    },
    videoPara: {
        type: 'String',
        required: true,
    },
    question: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    },
});

const AuraPage = mongoose.model('AuraPage', AuraPageSchema);
export default AuraPage;
