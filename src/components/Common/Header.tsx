import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { useDispatch } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect } from "react";
import { logout } from "../../store/slices/authSlice";
import { clearUser } from "../../store/slices/userSlice";
import { useAppSelector } from "../../store/hooks";
import ChangeTheme from "./ChangeTheme";

const Header = () => {
  const user = useAppSelector((state: RootState) => state.user.user);

  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    navigate("/auth");
    dispatch(logout());
    dispatch(clearUser());
  }, [dispatch, navigate]);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, [user]);
  if (!user) {
    return null;
  }
  return (
    <Navbar maxWidth="full" className="border-b border-content2 bg-content1">
      <NavbarBrand>
        <div className="font-bold text-inherit flex items-center gap-2">
          <Icon icon="lucide:layout-dashboard" width={24} />
          <span>Forum Admin</span>
        </div>
      </NavbarBrand>

      <NavbarContent justify="end">
        <div className="flex items-center gap-x-4">
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Button variant="light" isIconOnly>
                <Avatar
                  name={user?.username || "Admin"}
                  size="sm"
                  className="cursor-pointer"
                />
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="User Actions">
              {/* <DropdownItem key="profile" startContent={<Icon icon="lucide:user" />}>
                                Profile
                            </DropdownItem> */}
              <DropdownItem
                key="settings"
                startContent={<Icon icon="lucide:settings" />}
                onPress={() => {
                  navigate("/settings");
                }}
              >
                Cài đặt
              </DropdownItem>

              <DropdownItem
                key="logout"
                color="danger"
                startContent={<Icon icon="lucide:log-out" />}
                onPress={handleLogout}
              >
                Đăng xuất
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <ChangeTheme />
        </div>
      </NavbarContent>
    </Navbar>
  );
};

export default Header;
