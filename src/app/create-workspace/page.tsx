'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Typography from '@/components/ui/typography';
import { useCreateWorkspaceValues } from '@/hooks/create-workspace-value';

const Page = () => {
  const { currStep } = useCreateWorkspaceValues();

  let stepInView = null;

  switch (currStep) {
    case 1:
      stepInView = <Step1 />;
      break;
    case 2:
      stepInView = <Step2 />;
      break;
    default:
      stepInView = <Step1 />;
      break;
  }

  return (
    <div className="w-screen h-screen grid place-content-center bg-neutral-800 text-white">
      <div className="max-w-[550px]">
        <Typography
          text={`step ${currStep} of 2`}
          variant="p"
          className="text-neutral-400"
        />
      </div>
      {stepInView}
    </div>
  );
};

export default Page;

const Step1 = () => {
  const { name, updateValues, setCurrStep } = useCreateWorkspaceValues();

  return (
    <>
      <Typography
        text="what is the name of your company or team"
        className="my-4"
      />
      <Typography
        text="This will be the name of Slackzz workspace - choose something that your team will recognize"
        className="text-neutral-400"
        variant="p"
      />
      <form className="mt-6">
        <fieldset>
          <Input
            className="bg-neutral-700 text-white border-neutral-600"
            type="text"
            value={name}
            placeholder="Enter yout company name"
            onChange={(event) => updateValues({ name: event.target.value })}
          />
          <Button
            disabled={!name}
            type="button"
            className="mt-10"
            onClick={() => setCurrStep(2)}
          >
            <Typography text="Next" variant="p" />
          </Button>
        </fieldset>
      </form>
    </>
  );
};

const Step2 = () => {
  const { imageUrl, updateValues, setCurrStep } = useCreateWorkspaceValues();

  const handleSubmit = () => {};

  return (
    <>
      <div>
        <Button
          size="sm"
          className="text-white"
          variant="link"
          onClick={() => setCurrStep(1)}
        >
          <Typography text="Back" variant="p" />
        </Button>
      </div>
      <form>
        <Typography text="Add workspace avatar" className="my-4" />
        <Typography
          text="This image can be changed later in your workspace settings."
          className="text-neutral-400"
          variant="p"
        />
        <fieldset className="mt-6 flex flex-col items-center space-y-9">
          {/* IMAGE COMPONENT*/}
          <div className="space-x-5">
            <Button
              onClick={() => {
                updateValues('');
                handleSubmit();
              }}
            >
              <Typography text="Skip for now " variant="p" />
            </Button>
            {imageUrl ? (
              <Button
                type="button"
                onClick={handleSubmit}
                size="sm"
                variant="destructive"
              >
                <Typography text="submit" variant="p" />
              </Button>
            ) : (
              <Button size="sm" className="text-white bg-gray-500">
                <Typography text="Select and Image" variant="p" />
              </Button>
            )}
          </div>
        </fieldset>
      </form>
    </>
  );
};
