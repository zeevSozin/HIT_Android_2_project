import { createContext, useContext, useEffect, useState } from "react";
import RetractableContainer from "../components/RetractableContainer";
import UserListContainer from "../components/users/UserListContainer";
import UsersSideBarContent from "../components/users/UsersSideBarContent";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../apis/user";
import { LoadingContext } from "../App";
import Modal from "../components/Modal";
import ResetPasswordModalContent from "../components/users/ResetPasswordModalContent";
import DeleteUserModalContent from "../components/users/DeleteUserModalContent";

export const SelectedUserContext = createContext();
export const ResetPasswordUserModalContext = createContext();
export const DeleteUserModalContext = createContext();
export const UsersContext = createContext([]);
export const RefetchContext = createContext();

function UsersPage() {
  const [users, setUsers] = useState([]);
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isResetPasswordModalOpen, SetIsResetPasswordModalOpen] =
    useState(false);
  const [isDeleteUserModalOpen, setIsDeleteUserModalOpen] = useState(false);

  const {
    isLoading: usersIsLoading,
    data,
    error,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });
  useEffect(() => {
    setUsers((cur) => (cur = data));
  }, [data]);

  return (
    <div>
      <UsersContext.Provider value={{ users, setUsers }}>
        <SelectedUserContext.Provider value={{ selectedUser, setSelectedUser }}>
          <ResetPasswordUserModalContext.Provider
            value={{ isResetPasswordModalOpen, SetIsResetPasswordModalOpen }}
          >
            <DeleteUserModalContext.Provider
              value={{ isDeleteUserModalOpen, setIsDeleteUserModalOpen }}
            >
              {setIsLoading(usersIsLoading)}
              <RefetchContext.Provider value={{ refetch }}>
                <RetractableContainer
                  sidebarContent={<UsersSideBarContent />}
                  mainContent={<UserListContainer data={users} />}
                />
                <Modal
                  isOpen={isResetPasswordModalOpen}
                  onClose={() => {
                    SetIsResetPasswordModalOpen(false);
                  }}
                >
                  <ResetPasswordModalContent data={selectedUser} />
                </Modal>
                <Modal
                  isOpen={isDeleteUserModalOpen}
                  onClose={() => {
                    setIsDeleteUserModalOpen(false);
                  }}
                >
                  <DeleteUserModalContent data={selectedUser} />
                </Modal>
              </RefetchContext.Provider>
            </DeleteUserModalContext.Provider>
          </ResetPasswordUserModalContext.Provider>
        </SelectedUserContext.Provider>
      </UsersContext.Provider>
    </div>
  );
}

export default UsersPage;
