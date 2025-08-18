// so i need to write graphql mutations and subscriptions
export const INSERT_CHAT = `
  mutation InsertChat($title: String!, $user_id: uuid!) {
    insert_subspace_chats_one(object: {title: $title, user_id: $user_id}) {
      id
      title
      user_id
    }
  }
`;

export const DELETE_CHAT = `
  mutation DeleteChat($id: uuid!) {
    delete_subspace_chats_by_pk(id: $id) {
      id
    }
  }
`;

export const UPDATE_CHAT = `
  mutation UpdateChat($object: subspace_chats_set_input!, $id: uuid!) {
    update_subspace_chats_by_pk(pk_columns: {id: $id}, _set: $object) {
      id
      title
      user_id
    }
  }
`;

export const FETCH_CHATS = `
  query {
    subspace_chats {
      id
      title
      user_id
    }
  }
`;

export const CHAT_SUBSCRIPTION = `
  subscription {
    subspace_chats {
      id
      title
      user_id
    }
  }
`;

// Similar for messages table...
