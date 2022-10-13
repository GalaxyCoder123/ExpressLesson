import { IMessage } from "../model/Message";
import { Spaceship } from "../model/spaceship";

export async function findAllMessages(user: string, userWhoRecieves: string) {
  const key = user + "/" + userWhoRecieves;
  const allMessagesSent = allMessages.get(key);
  return allMessagesSent;

};

const allMessages: Map <string,string[]> = new Map();

export function addMessage(newMessage: IMessage) {
  const key = newMessage.user + "/" + newMessage.userWhoRecieves;
  let allMessagesSent = allMessages.get(key);
  if (allMessagesSent===undefined){
    allMessagesSent = [];
  };
  allMessagesSent.push(newMessage.messageText);
  allMessages.set(key, allMessagesSent);
};