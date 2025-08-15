import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Input,
  Button,
  Switch,
  Divider,
} from "@heroui/react";
import { Icon } from "@iconify/react";

interface SystemSettings {
  siteName: string;
  siteDescription: string;
  allowRegistration: boolean;
  requireEmailVerification: boolean;
  postsPerPage: number;
  commentsPerPage: number;
  allowFileUploads: boolean;
  maxFileSize: number;
  allowedFileTypes: string;
  maintenanceMode: boolean;
  contactEmail: string;
}

const Settings: React.FC = () => {
  const [settings, setSettings] = React.useState<SystemSettings>({
    siteName: "Forum",
    siteDescription: "Nền tảng thảo luận cho cộng đồng",
    allowRegistration: true,
    requireEmailVerification: true,
    postsPerPage: 20,
    commentsPerPage: 10,
    allowFileUploads: true,
    maxFileSize: 5,
    allowedFileTypes: "jpg,jpeg,png,gif,pdf",
    maintenanceMode: false,
    contactEmail: "admin@example.com",
  });

  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<string | null>(null);

  const handleInputChange = (
    key: keyof SystemSettings,
    value: string | boolean | number
  ) => {
    setSettings({
      ...settings,
      [key]: value,
    });
  };

  const handleSaveSettings = async () => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);

      // In a real app, you would call your API to save the settings
      // await axios.post('http://localhost:3000/api/settings', settings);

      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSuccess("Lưu cài đặt thành công");
    } catch (err) {
      console.error("Có lỗi khi lưu cài đặt:", err);
      setError("Lưu cài đặt thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-1">Cài đặt</h1>
        <p className="text-default-500">Điều chỉnh thiết lập hệ thống</p>
      </div>

      {error && (
        <div className="p-4 bg-danger-50 text-danger-500 rounded-md">
          {error}
        </div>
      )}

      {success && (
        <div className="p-4 bg-success-50 text-success-500 rounded-md">
          {success}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold">Cài đặt chung</h2>
          </CardHeader>
          <CardBody className="space-y-4">
            <Input
              label="Tên trang"
              placeholder="Nhập tên trang"
              value={settings.siteName}
              onValueChange={(value) => handleInputChange("siteName", value)}
            />

            <Input
              label="Mô tả trang"
              placeholder="Nhập mô tả"
              value={settings.siteDescription}
              onValueChange={(value) =>
                handleInputChange("siteDescription", value)
              }
            />

            <Input
              label="Email liên hệ"
              placeholder="Nhập email liên hệ"
              type="email"
              value={settings.contactEmail}
              onValueChange={(value) =>
                handleInputChange("contactEmail", value)
              }
            />

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Chế độ bảo trì</p>
                <p className="text-xs text-default-500">
                  Khi bật, chỉ có người quản trị mới có thể truy cập trang
                </p>
              </div>
              <Switch
                isSelected={settings.maintenanceMode}
                onValueChange={(value) =>
                  handleInputChange("maintenanceMode", value)
                }
                color="danger"
              />
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold">Cài đặt người dùng</h2>
          </CardHeader>
          <CardBody className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Cho phép đăng ký</p>
                <p className="text-xs text-default-500">
                  Cho phép người dùng mới đăng ký
                </p>
              </div>
              <Switch
                isSelected={settings.allowRegistration}
                onValueChange={(value) =>
                  handleInputChange("allowRegistration", value)
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Yêu cầu xác thực email</p>
                <p className="text-xs text-default-500">
                  Người dùng phải xác thực email trước khi đăng bài
                </p>
              </div>
              <Switch
                isSelected={settings.requireEmailVerification}
                onValueChange={(value) =>
                  handleInputChange("requireEmailVerification", value)
                }
              />
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold">Cài đặt nội dung</h2>
          </CardHeader>
          <CardBody className="space-y-4">
            <Input
              label="Số bài mỗi trang"
              type="number"
              min={1}
              max={100}
              value={settings.postsPerPage.toString()}
              onValueChange={(value) =>
                handleInputChange("postsPerPage", parseInt(value) || 10)
              }
            />

            <Input
              label="Số bình luận mỗi trang"
              type="number"
              min={1}
              max={100}
              value={settings.commentsPerPage.toString()}
              onValueChange={(value) =>
                handleInputChange("commentsPerPage", parseInt(value) || 10)
              }
            />

            <Divider />

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Cho phép tải tệp lên</p>
                <p className="text-xs text-default-500">
                  Cho phép người dùng tải tệp lên
                </p>
              </div>
              <Switch
                isSelected={settings.allowFileUploads}
                onValueChange={(value) =>
                  handleInputChange("allowFileUploads", value)
                }
              />
            </div>

            <Input
              label="Kích thước tối đa của tệp (MB)"
              type="number"
              min={1}
              max={50}
              value={settings.maxFileSize.toString()}
              onValueChange={(value) =>
                handleInputChange("maxFileSize", parseInt(value) || 5)
              }
              isDisabled={!settings.allowFileUploads}
            />

            <Input
              label="Định dạng được cho phép"
              placeholder="Comma-separated file extensions"
              value={settings.allowedFileTypes}
              onValueChange={(value) =>
                handleInputChange("allowedFileTypes", value)
              }
              isDisabled={!settings.allowFileUploads}
              description="Nhập các đuôi được cho phép, phân cách bằng dấu phẩy"
            />
          </CardBody>
        </Card>

        <div className="flex justify-end">
          <Button
            color="primary"
            onPress={handleSaveSettings}
            isLoading={loading}
            startContent={!loading && <Icon icon="lucide:save" />}
          >
            Save Settings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
