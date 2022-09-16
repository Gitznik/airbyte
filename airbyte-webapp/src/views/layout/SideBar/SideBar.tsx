import { faSlack } from "@fortawesome/free-brands-svg-icons";
import { faRocket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classnames from "classnames";
import React from "react";
import { FormattedMessage } from "react-intl";
import { NavLink, useLocation } from "react-router-dom";

import { Link } from "components";
import Version from "components/Version";

import { useConfig } from "config";
import { useCurrentWorkspace } from "hooks/services/useWorkspace";

import { RoutePaths } from "../../../pages/routePaths";
import ConnectionsIcon from "./components/ConnectionsIcon";
import DestinationIcon from "./components/DestinationIcon";
import DocsIcon from "./components/DocsIcon";
import OnboardingIcon from "./components/OnboardingIcon";
import RecipesIcon from "./components/RecipesIcon";
import SettingsIcon from "./components/SettingsIcon";
import { SidebarDropdownMenu, SidebarDropdownMenuItemType } from "./components/SidebarDropdownMenu";
import SourceIcon from "./components/SourceIcon";
import { NotificationIndicator } from "./NotificationIndicator";
import styles from "./SideBar.module.scss";

export const useCalculateSidebarStyles = () => {
  const location = useLocation();

  const menuItemStyle = (isActive: boolean) => {
    const isChild = location.pathname.split("/").length > 4 && location.pathname.split("/")[3] !== "settings";
    return classnames(styles.menuItem, { [styles.active]: isActive, [styles.activeChild]: isChild && isActive });
  };

  return ({ isActive }: { isActive: boolean }) => menuItemStyle(isActive);
};

const SideBar: React.FC = () => {
  const config = useConfig();
  const workspace = useCurrentWorkspace();
  const navLinkClassName = useCalculateSidebarStyles();

  return (
    <nav className={styles.nav}>
      <div>
        <Link to={workspace.displaySetupWizard ? RoutePaths.Onboarding : RoutePaths.Connections}>
          <img src="/simpleLogo.svg" alt="logo" height={33} width={33} />
        </Link>
        <ul className={styles.menu}>
          {workspace.displaySetupWizard ? (
            <li>
              <NavLink className={navLinkClassName} to={RoutePaths.Onboarding}>
                <OnboardingIcon />
                <span className={styles.text}>
                  <FormattedMessage id="sidebar.onboarding" />
                </span>
              </NavLink>
            </li>
          ) : null}
          <li>
            <NavLink className={navLinkClassName} to={RoutePaths.Connections}>
              <ConnectionsIcon />
              <span className={styles.text}>
                <FormattedMessage id="sidebar.connections" />
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink className={navLinkClassName} to={RoutePaths.Source}>
              <SourceIcon />
              <span className={styles.text}>
                <FormattedMessage id="sidebar.sources" />
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink className={navLinkClassName} to={RoutePaths.Destination}>
              <DestinationIcon />
              <span className={styles.text}>
                <FormattedMessage id="sidebar.destinations" />
              </span>
            </NavLink>
          </li>
        </ul>
      </div>
      <ul className={styles.menu}>
        <li>
          <a href={config.links.updateLink} target="_blank" rel="noreferrer" className={styles.menuItem}>
            <FontAwesomeIcon className={styles.helpIcon} icon={faRocket} />
            <span className={styles.text}>
              <FormattedMessage id="sidebar.update" />
            </span>
          </a>
        </li>
        <li>
          <SidebarDropdownMenu
            options={[
              {
                type: SidebarDropdownMenuItemType.LINK,
                href: config.links.docsLink,
                icon: <DocsIcon />,
                displayName: <FormattedMessage id="sidebar.documentation" />,
              },
              {
                type: SidebarDropdownMenuItemType.LINK,
                href: config.links.slackLink,
                icon: <FontAwesomeIcon icon={faSlack} />,
                displayName: <FormattedMessage id="sidebar.joinSlack" />,
              },
              {
                type: SidebarDropdownMenuItemType.LINK,
                href: config.links.recipesLink,
                icon: <RecipesIcon />,
                displayName: <FormattedMessage id="sidebar.recipes" />,
              },
            ]}
          >
            <DocsIcon />
            <span>
              <FormattedMessage id="sidebar.resources" />
            </span>
          </SidebarDropdownMenu>
        </li>
        <li>
          <NavLink className={navLinkClassName} to={RoutePaths.Settings}>
            <React.Suspense fallback={null}>
              <NotificationIndicator />
            </React.Suspense>
            <SettingsIcon />
            <span className={styles.text}>
              <FormattedMessage id="sidebar.settings" />
            </span>
          </NavLink>
        </li>
        {config.version ? (
          <li>
            <Version primary />
          </li>
        ) : null}
      </ul>
    </nav>
  );
};

export default SideBar;
