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
`;

const CrewName = styled.h1`
  font-size: 40px;
  font-weight: 800;
`;

const MessageForm = styled.form``;

const MessageInput = styled.input`
  border: 1px solid #b4b4b4;
  box-sizing: border-box;
  border-radius: 4px;
  flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 0;
  margin: 25px 0px;
  padding: 8px;
  width: 260px;
`;

const MessageButton = styled.input`
  cursor: pointer;
  background: #00bcd4;
  border-radius: 4px;
  border: none;
  color: #fff;
  flex: none;
  order: 0;
  flex-grow: 0;
  height: 36px;
  margin: 4px 4px;
  font-weight: bold;
`;

const ReceivedMessages = styled.div`
  margin: 0 auto;
  border: 1px solid ${props => props.theme.textColor};
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
`;

const MessageDate = styled.span`
  color: grey;
`;

const MessageText = styled.span`
  margin-right: auto;
  color: ${props => props.theme.accentColor};
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
        {messages
          .sort((a, b) => Number(b.createdAt) - Number(a.createdAt))
          .map(message => {
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
