import React ,{useState} from 'react'
import {BsSend} from "react-icons/bs"
import useSendMessage from "../../hooks/useSendMessage"
const MessageInput = () => {
    const [message, setMessage] = useState("");
	const { loading, sendMessage } = useSendMessage();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!message) return;
		await sendMessage(message);
		setMessage("");
	};
  return (
    <div>
     <form className='px-4 my-3' onSubmit={handleSubmit}>
    <div className="flex-grow-0 py-3 px-4 border-top">
        <div className="input-group">
            <input type="text" className="form-control" value={message}
                onChange={(e) => setMessage(e.target.value)} placeholder="Type your message" />
            <button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3'>
                {loading ? <div className='loading loading-spinner'></div> : <BsSend />}
				<button className='btn btn-primary'>
                <span className="placeholder-text">Send</span>
				</button>
            </button>
        </div>
    </div>
</form>

    </div>
  )
}

export default MessageInput
