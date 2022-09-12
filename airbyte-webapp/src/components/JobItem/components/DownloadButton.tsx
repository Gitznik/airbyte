import { faFileDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useIntl } from "react-intl";

import { Button } from "components";

import { JobDebugInfoRead } from "core/request/AirbyteClient";
import { downloadFile } from "utils/file";

import { ButtonType } from "../../base";

interface DownloadButtonProps {
  jobDebugInfo: JobDebugInfoRead;
  fileName: string;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ jobDebugInfo, fileName }) => {
  const { formatMessage } = useIntl();

  const downloadFileWithLogs = () => {
    const file = new Blob([jobDebugInfo.attempts.flatMap((info) => info.logs.logLines).join("\n")], {
      type: "text/plain;charset=utf-8",
    });
    downloadFile(file, `${fileName}.txt`);
  };

  return (
    <Button
      onClick={downloadFileWithLogs}
      buttonType={ButtonType.Secondary}
      title={formatMessage({
        id: "sources.downloadLogs",
      })}
      icon={<FontAwesomeIcon icon={faFileDownload} />}
    />
  );
};

export default DownloadButton;
