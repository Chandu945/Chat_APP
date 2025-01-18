import { useState, useEffect } from "react";
import axios from "axios";

const GroupManagement = () => {
  const [groups, setGroups] = useState([]); // Groups user is part of
  const [groupUsers, setGroupUsers] = useState([]); // Users in the selected group
  const [nonGroupUsers, setNonGroupUsers] = useState([]); // Users not in the selected group
  const [allUsers, setAllUsers] = useState([]); // All users to add to group
  const [newGroupName, setNewGroupName] = useState(""); // Group name input
  const [selectedGroup, setSelectedGroup] = useState(null); // Group selected for management
  const [selectedUsers, setSelectedUsers] = useState([]); // Users selected for new group
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const userId = localStorage.getItem("userId"); // Get current user ID from storage

  // Fetch groups and users
  useEffect(() => {
    const fetchGroupsAndUsers = async () => {
      try {
        const groupRes = await axios.get(`http://localhost:8080/group/userGroups/${userId}`);
        setGroups(groupRes.data.groups);

        const userRes = await axios.get(`http://localhost:8080/users/${userId}`);
        setAllUsers(userRes.data);
      } catch (error) {
        console.error("Error fetching groups or users:", error);
      }
    };

    fetchGroupsAndUsers();
  }, [userId]);

  // Create a group
  const createGroup = async () => {
    if (!newGroupName.trim() || selectedUsers.length === 0) {
      alert("Enter a group name and select at least one member.");
      return;
    }

    try {
      await axios.post("http://localhost:8080/group/create", {
        name: newGroupName,
        creatorId: userId,
        members: selectedUsers,
      });

      alert("Group created successfully!");
      setNewGroupName("");
      setSelectedUsers([]);
    } catch (error) {
      console.error("Error creating group:", error);
      alert("Failed to create group.");
    }
  };

  // Add user to group (Only Admin)
  const addUserToGroup = async (groupId, AddUserId) => {
    try {
      await axios.post("http://localhost:8080/group/addUser", {
        groupId,
        userId: AddUserId,
        adminId: userId,
      });
      alert("User added!");
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  // Remove user from group (Only Admin)
  const removeUserFromGroup = async (groupId, removedUserId) => {
    try {
      await axios.post("http://localhost:8080/group/removeUser", {
        groupId,
        userId: removedUserId,
        adminId: userId,
      });
      alert("User removed!");
    } catch (error) {
      console.error("Error removing user:", error);
    }
  };

  // Leave a group
  const leaveGroup = async (groupId) => {
    try {
      await axios.post("http://localhost:8080/group/leave", {
        groupId,
        userId,
      });
      alert("You left the group.");
    } catch (error) {
      console.error("Error leaving group:", error);
    }
  };

  const fetchGroupUsers = async (groupId) => {
    try {
      const response = await axios.get(`http://localhost:8080/group/groupUsers/${groupId}`);
      setGroupUsers(response.data.groupUsers); // Users in the group
      setNonGroupUsers(response.data.nonGroupUsers); // Users not in the group
    } catch (error) {
      console.error("Error fetching group users:", error);
    }
  };

  // Handle group selection
  const handleGroupSelect = (group) => {
    setSelectedGroup(group);
    fetchGroupUsers(group.id);
    setIsModalOpen(true); // Open modal when a group is selected
  };

  return (
    <div className="group-management">
      <h2>Manage Groups</h2>

      {/* Create Group */}
      <div>
        <h3>Create a Group</h3>
        <input
          type="text"
          placeholder="Enter group name"
          value={newGroupName}
          onChange={(e) => setNewGroupName(e.target.value)}
        />
        <h4>Select Users</h4>
        <ul>
          {allUsers.map((user) => (
            <li key={user.id}>
              <input
                type="checkbox"
                checked={selectedUsers.includes(user.id)}
                onChange={() =>
                  setSelectedUsers((prev) =>
                    prev.includes(user.id)
                      ? prev.filter((id) => id !== user.id)
                      : [...prev, user.id]
                  )
                }
              />
              {user.name}
            </li>
          ))}
        </ul>
        <button onClick={createGroup}>Create Group</button>
      </div>

      {/* List Groups */}
      <h3>Your Groups</h3>
      <ul>
        {groups.map((group) => (
          <li key={group.id} onClick={() => handleGroupSelect(group)}>
            {group.name}
          </li>
        ))}
      </ul>

      {/* Modal for Group Management */}
      {isModalOpen && selectedGroup && (
        <div className="modal">
          <div className="modal-content">
            <h3>Manage {selectedGroup.name}</h3>
            <h4>Group Members</h4>
            <ul>
              {groupUsers.map((user) => (
                <li key={user.id}>
                  {user.name}
                  <button onClick={() => removeUserFromGroup(selectedGroup.id, user.id)}>
                    Remove
                  </button>
                </li>
              ))}
            </ul>

            <h4>Add Users</h4>
            <ul>
              {nonGroupUsers.map((user) => (
                <li key={user.id}>
                  {user.name}
                  <button onClick={() => addUserToGroup(selectedGroup.id, user.id)}>
                    Add
                  </button>
                </li>
              ))}
            </ul>

            <button onClick={() => leaveGroup(selectedGroup.id)}>Leave Group</button>
            <button onClick={() => setIsModalOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupManagement;