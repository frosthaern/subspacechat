import { gql } from "@apollo/client";

export const INSERT_CHAT = gql`
  mutation InsertChat($title: String!, $chat_id: uuid!) {
    insert_subspace_chats_one(object: { id: $chat_id, title: $title }) {
      id
      title
    }
  }
`;

export const DELETE_CHAT = gql`
  mutation DeleteChat($id: uuid!) {
    delete_subspace_chats_by_pk(id: $id) {
      id
    }
  }
`;

export const UPDATE_CHAT = gql`
  mutation UpdateChat($object: subspace_chats_set_input!, $id: uuid!) {
    update_subspace_chats_by_pk(pk_columns: { id: $id }, _set: $object) {
      id
      title
    }
  }
`;

export const FETCH_CHATS = gql`
  query FetchChats($user_id: uuid!) {
    subspace_chats(where: { user_id: { _eq: $user_id } }) {
      id
      title
    }
  }
`;

export const MESSAGES_OF_CHAT_SUBSCRIPTION = gql`
  subscription MessagesOfChat($chat_id: uuid!) {
    subspace_chats(where: { id: { _eq: $chat_id } }) {
      id
      title
      messages {
        id
        content
        is_user
        chat_id
      }
    }
  }
`;

export const INSERT_MESSAGE = gql`
  mutation InsertMessage($content: String!, $chat_id: uuid!) {
    insert_subspace_messages_one(
      object: { content: $content, chat_id: $chat_id }
    ) {
      id
      content
      chat_id
    }
  }
`;

export const GET_CHAT_BY_ID = gql`
  query GetChatById($id: uuid!) {
    subspace_chats(where: { id: { _eq: $id } }) {
      id
    }
  }
`;

export const DELETE_MESSAGE = gql`
  mutation DeleteMessage($id: uuid!) {
    delete_subspace_messages_by_pk(id: $id) {
      id
    }
  }
`;

export const SEND_MESSAGE = gql`
  mutation SendMessage($content: String!, $chat_id: uuid!) {
    sendMessage(chat_id: $chat_id, content: $content)
  }
`;
