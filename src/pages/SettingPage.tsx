import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Input,
  Button,
  Switch,
  Accordion,
  AccordionItem,
  Divider,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import axios from "axios";

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
    siteDescription: "A community discussion platform",
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

      setSuccess("Settings saved successfully");
    } catch (err) {
      console.error("Error saving settings:", err);
      setError("Failed to save settings");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-1">Settings</h1>
        <p className="text-default-500">Configure system settings</p>
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
            <h2 className="text-lg font-semibold">General Settings</h2>
          </CardHeader>
          <CardBody className="space-y-4">
            <Input
              label="Site Name"
              placeholder="Enter site name"
              value={settings.siteName}
              onValueChange={(value) => handleInputChange("siteName", value)}
            />

            <Input
              label="Site Description"
              placeholder="Enter site description"
              value={settings.siteDescription}
              onValueChange={(value) =>
                handleInputChange("siteDescription", value)
              }
            />

            <Input
              label="Contact Email"
              placeholder="Enter contact email"
              type="email"
              value={settings.contactEmail}
              onValueChange={(value) =>
                handleInputChange("contactEmail", value)
              }
            />

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Maintenance Mode</p>
                <p className="text-xs text-default-500">
                  When enabled, only administrators can access the site
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
            <h2 className="text-lg font-semibold">User Settings</h2>
          </CardHeader>
          <CardBody className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Allow Registration</p>
                <p className="text-xs text-default-500">
                  Allow new users to register
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
                <p className="text-sm font-medium">
                  Require Email Verification
                </p>
                <p className="text-xs text-default-500">
                  Users must verify their email before posting
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
            <h2 className="text-lg font-semibold">Content Settings</h2>
          </CardHeader>
          <CardBody className="space-y-4">
            <Input
              label="Posts Per Page"
              type="number"
              min={1}
              max={100}
              value={settings.postsPerPage.toString()}
              onValueChange={(value) =>
                handleInputChange("postsPerPage", parseInt(value) || 10)
              }
            />

            <Input
              label="Comments Per Page"
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
                <p className="text-sm font-medium">Allow File Uploads</p>
                <p className="text-xs text-default-500">
                  Allow users to upload files
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
              label="Max File Size (MB)"
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
              label="Allowed File Types"
              placeholder="Comma-separated file extensions"
              value={settings.allowedFileTypes}
              onValueChange={(value) =>
                handleInputChange("allowedFileTypes", value)
              }
              isDisabled={!settings.allowFileUploads}
              description="Enter comma-separated file extensions (e.g., jpg,png,pdf)"
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
