import { faTrash } from "@fortawesome/free-solid-svg-icons";
import React, { useCallback, useMemo } from "react";
import { FormattedMessage } from "react-intl";
import { useNavigate, useParams } from "react-router-dom";

import { H6 } from "components";
import { InfoBox } from "components/InfoBox";
import StepsMenu from "components/StepsMenu";

import { ConnectionStatus } from "core/request/AirbyteClient";
import { useConnectionFormService } from "hooks/services/Connection/ConnectionFormService";

import { ConnectionSettingsRoutes } from "../ConnectionSettingsRoutes";
import { ConnectionName } from "./ConnectionName";
import styles from "./ConnectionPageTitle.module.scss";
import { StatusMainInfo } from "./StatusMainInfo";

interface ConnectionPageTitleProps {
  onStatusUpdating?: (updating: boolean) => void;
}

export const ConnectionPageTitle: React.FC<ConnectionPageTitleProps> = ({ onStatusUpdating }) => {
  const params = useParams<{ id: string; "*": ConnectionSettingsRoutes }>();
  const navigate = useNavigate();
  const currentStep = params["*"] || ConnectionSettingsRoutes.STATUS;

  const { connection } = useConnectionFormService();

  const steps = useMemo(() => {
    const steps = [
      {
        id: ConnectionSettingsRoutes.STATUS,
        name: <FormattedMessage id="sources.status" />,
      },
      {
        id: ConnectionSettingsRoutes.REPLICATION,
        name: <FormattedMessage id="connection.replication" />,
      },
      {
        id: ConnectionSettingsRoutes.TRANSFORMATION,
        name: <FormattedMessage id="connectionForm.transformation.title" />,
      },
    ];

    connection.status !== ConnectionStatus.deprecated &&
      steps.push({
        id: ConnectionSettingsRoutes.SETTINGS,
        name: <FormattedMessage id="sources.settings" />,
      });

    return steps;
  }, [connection.status]);

  const onSelectStep = useCallback(
    (id: string) => {
      if (id === ConnectionSettingsRoutes.STATUS) {
        navigate("");
      } else {
        navigate(id);
      }
    },
    [navigate]
  );

  return (
    <div className={styles.container}>
      {connection.status === ConnectionStatus.deprecated && (
        <InfoBox className={styles.connectionDeleted} icon={faTrash}>
          <FormattedMessage id="connection.connectionDeletedView" />
        </InfoBox>
      )}
      <H6 center bold highlighted>
        <FormattedMessage id="connection.title" />
      </H6>
      <ConnectionName />
      <div className={styles.statusContainer}>
        <StatusMainInfo onStatusUpdating={onStatusUpdating} />
      </div>
      <StepsMenu lightMode data={steps} onSelect={onSelectStep} activeStep={currentStep} />
    </div>
  );
};
