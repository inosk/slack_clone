'use client';

import { useState } from 'react';
import CreateChannelDaialog from './create-channel-dialog';
import { Button } from './ui/button';
import Typography from './ui/typography';

type Props = {
  workspaceName: string;
  userId: string;
  workspaceId: string;
};

const NoDataScreen = ({ workspaceName, userId, workspaceId }: Props) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  return (
    <div className="w-full h-[calc(100vh-63px)] p-4">
      <Typography
        text={`👋 Welcome to ${workspaceName} workspace`}
        variant="h3"
      />
      <Typography
        text={'Get started by creating a channel direct message'}
        variant="p"
        className="my-3"
      />

      <div className="w-fit">
        <Button className="w-full my-2" onClick={() => setDialogOpen(true)}>
          <Typography text="Create Channel" variant="p" />
        </Button>
      </div>

      <CreateChannelDaialog
        userId={userId}
        workspaceId={workspaceId}
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
      />
    </div>
  );
};

export default NoDataScreen;
