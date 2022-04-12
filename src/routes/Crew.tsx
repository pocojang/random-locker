import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { dbService } from "../fbase";

interface Message {
  id: string;
  createdAt: string;
  text: string;
}

function Crew() {
  const { crewName } = useParams();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const getMessages = async () => {
    const dbMessages = await dbService
      .collection("crews")
      .doc(crewName)
      .collection("messages")
      .get();
    dbMessages.forEach((document: any) => {
      const messageObject = {
        ...document.data(),
        id: document.id,
      };
      setMessages(prev => [messageObject, ...prev]);
    });
  };

  useEffect(() => {
    getMessages();
  }, []);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await dbService
      .collection("crews")
      .doc(crewName)
      .collection("messages")
      .add({
        text: message,
        createdAt: Date.now(),
      });
    setMessage("");
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    setMessage(value);
  };

  return (
    <div>
      <h1>Crew: {crewName}</h1>
      <form onSubmit={onSubmit}>
        <input
          value={message}
          onChange={onChange}
          type='text'
          placeholder='메세지를 적어주세요.'
          maxLength={120}
        />
        <input type='submit' value='message' />
      </form>
      <div>
        {messages.map(message => (
          <div key={"li-" + message.id}>
            <span>
              {message.createdAt}
              {message.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Crew;
