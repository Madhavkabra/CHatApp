export const getSeenByMembersWithChat = (chats, userId, groupMember) => {
  const chatMessages = chats?.map((chat) => {
    chat.sentByUser = getMemberDataById(groupMember,chat.sentBy)
    if (chat?.sentBy === userId) {
      const memberData = chat?.seenBy?.map((memberId) =>
        getMemberDataById(groupMember, memberId)
      );

      return { ...chat, seenBy: memberData };
    } else {
      return chat;
    }
  });

  return chatMessages;
};

export const getMemberDataById = (members, id) => {
  return members?.find((member) => member.uid === id);
};
