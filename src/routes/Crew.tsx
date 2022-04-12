import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { dbService } from "../fbase";
import styled from "styled-components";
import { getDate } from "../utils";

interface Message {
  id: string;
  createdAt: string;
  text: string;
}

const Container = styled.div`
  margin: 0 auto;
  max-width: 600px;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 40px;
  height: 100vh;
`;

const CrewName = styled.h1`
  font-size: 40px;
  font-weight: 800;
  color: var(--primary);
`;

const MessageForm = styled.form`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
`;

const MessageInput = styled.input`
  padding: 0 8px;
  border: 1px solid;
  box-sizing: border-box;
  border-radius: 4px 0 0 4px;
  height: 36px;
  line-height: 36px;
  font-weight: 400;
  font-size: 16px;
  width: 70%;
  height: 50px;
  margin: 30px 0 20px 0;
  padding: 10px;
`;

const MessageButton = styled.input`
  cursor: pointer;
  border: 1px solid var(--primary);
  background-color: var(--primary);
  border-radius: 0 4px 4px 0;
  height: 36px;
  border-style: none;
  color: var(--white);
  font-size: 18px;
  font-weight: bold;
  height: 50px;
  margin: 30px 0 20px 0;
  width: 20%;
`;

const ReceivedMessages = styled.div`
  margin: 0 auto;
  border: 1px solid;
  background-color: var(--primary-lighten);
  border-radius: 10px;
  padding: 15px;
`;

const MessagesWrapper = styled.div`
  display: grid;
  place-items: center;
  grid-template-columns: 1fr 2fr;
  grid-row-gap: 20px;
  grid-column-gap: 20px;
  margin: 10px;
  font-size: 18px;
  font-weight: 600;
`;

const MessageDate = styled.span`
  color: var(--secondary-lighten);
`;

const MessageText = styled.span`
  margin-right: auto;
  color: var(--white);
`;

function Crew() {
  const { crewName } = useParams();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    dbService
      .collection("crews")
      .doc(crewName)
      .collection("messages")
      .orderBy("createdAt", "desc")
      .onSnapshot(snapshot => {
        const messageArray = snapshot.docs.map(doc => ({
          id: doc.id,
          createdAt: doc.data().createdAt,
          text: doc.data().text,
        }));
        setMessages(messageArray);
      });
  }, [messages]);

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
    <Container>
      <CrewName>✨{crewName}의 사물함💬</CrewName>
      <MessageForm onSubmit={onSubmit}>
        <MessageInput
          value={message}
          onChange={onChange}
          type='text'
          placeholder='크루의 사물함에 응원의 쪽지를 남겨주세요.'
          maxLength={120}
        />
        <MessageButton type='submit' value='남기기' />
      </MessageForm>
      <ReceivedMessages>
        {messages.map(message => {
          return (
            <MessagesWrapper key={"li-" + message.id}>
              <MessageDate>{getDate(Number(message.createdAt))}</MessageDate>
              <MessageText>{message.text}</MessageText>
            </MessagesWrapper>
          );
        })}
      </ReceivedMessages>
    </Container>
  );
}

export default Crew;
