import mongoose from "mongoose";

const MediumPageSchema = new mongoose.Schema({
    MediumBanner: {
        type: 'string',
    },
    MediumPara: {
        type: 'String',
        required: true,
    },

    title1: {
type: 'string',
required: true,
    },
    
    Para1: {
        type: String,
        required: true
    },
    title2: {
        type: 'string',
        required: true,
            },
    Para2: {
        type: String,
        required: true
    },
});

const MediumPage = mongoose.model('MediumPage', MediumPageSchema);
export default MediumPage;
