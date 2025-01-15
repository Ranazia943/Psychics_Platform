import mongoose from "mongoose";

const PetPageSchema = new mongoose.Schema({
    PetBanner: {
        type: 'string',
    },
    video: {
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

const PetPage = mongoose.model('PetPage', PetPageSchema);
export default PetPage;
