// so i need to write graphql mutations and subscriptions
export const INSERT_CHAT = `
  mutation InsertChat($object: subspace_messages_insert_input!) {
    insert_subspace_messages_one(object: $object) {
      id
      content 
      chat_id 
      is_user
    }
  }
`;

export const DELETE_CHAT = `
  mutation DeleteChat($id: uuid!) {
    delete_subspace_messages_by_pk(id: $id) {
      id
    }
  }
`;

export const UPDATE_CHAT = `
  mutation UpdateChat($id: uuid!, $object: subspace_messages_set_input!) {
    update_subspace_messages_by_pk(pk_columns: {id: $id}, _set: $object) {
      id
      content
      chat_id
      is_user
    }
  }
`;

export const FETCH_CHATS = `
  query {
    subspace_messages {
      id
      content
      chat_id
      is_user
    }
  }
`;

export const CHAT_SUBSCRIPTION = `
  subscription {
    subspace_messages {
      id
      content
      chat_id
      is_user
    }
  }
`;

// Similar for messages table...
