import React from "react";
import { FormattedMessage } from "react-intl";
import { useMutation } from "react-query";
import styled from "styled-components";

import { Button, ButtonType } from "components";

import { PageTrackingCodes, useTrackPage } from "hooks/services/Analytics";
import { useAuthService } from "packages/cloud/services/auth/AuthService";
import { SettingsCard } from "pages/SettingsPage/pages/SettingsComponents";

import { EmailSection, NameSection, PasswordSection } from "./components";

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

const AccountSettingsView: React.FC = () => {
  const authService = useAuthService();
  const { mutateAsync: logout, isLoading: isLoggingOut } = useMutation(() => authService.logout());

  useTrackPage(PageTrackingCodes.SETTINGS_ACCOUNT);
  return (
    <>
      <NameSection />
      <EmailSection />
      {authService.hasPasswordLogin() && <PasswordSection />}
      <SettingsCard
        title={
          <Header>
            <FormattedMessage id="settings.accountSettings.logoutLabel" />
            <Button
              buttonType={ButtonType.Danger}
              onClick={() => logout()}
              isLoading={isLoggingOut}
              data-testid="button.signout"
              label={<FormattedMessage id="settings.accountSettings.logoutText" />}
            />
          </Header>
        }
      />
    </>
  );
};

export { AccountSettingsView };
