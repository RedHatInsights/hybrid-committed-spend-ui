import messages from 'locales/messages';
import React, { useState } from 'react';
import { Perspective } from 'routes/components/perspective';

import { ActualSpendBreakdownSummary } from './ActualSpendBreakdownSummary';

interface ActualSpendBreakdownOwnProps {
  perspective?: PerspectiveType;
  widgetId: number;
}

export type ActualSpendBreakdownProps = ActualSpendBreakdownOwnProps;

// eslint-disable-next-line no-shadow
export enum ResolutionType {
  cumulative = 'cumulative',
  monthly = 'monthly',
}

// eslint-disable-next-line no-shadow
export enum PerspectiveType {
  affiliate = 'affiliate',
  product = 'product',
  sourceOfSpend = 'source_of_spend',
}

const resolutionOptions = [
  { label: messages.actualSpendBreakdownResolutionValues, value: ResolutionType.monthly },
  { label: messages.actualSpendBreakdownResolutionValues, value: ResolutionType.cumulative },
];

const perspectiveOptions = [
  { label: messages.actualSpendBreakdownPerspectiveValues, value: PerspectiveType.sourceOfSpend },
  { label: messages.actualSpendBreakdownPerspectiveValues, value: PerspectiveType.affiliate },
  { label: messages.actualSpendBreakdownPerspectiveValues, value: PerspectiveType.product },
];

const ActualSpendBreakdownBase: React.FC<ActualSpendBreakdownProps> = ({ widgetId }) => {
  const [perspective, setPerspective] = useState(PerspectiveType.sourceOfSpend);
  const [resolution, setResolution] = useState(ResolutionType.monthly);

  const getPerspective = () => {
    return (
      <Perspective currentItem={perspective} onSelected={handleOnPerspectiveSelected} options={perspectiveOptions} />
    );
  };

  const getResolution = () => {
    return <Perspective currentItem={resolution} onSelected={handleOnResolutionSelected} options={resolutionOptions} />;
  };

  const handleOnPerspectiveSelected = value => {
    setPerspective(value);
  };

  const handleOnResolutionSelected = value => {
    setResolution(value);
  };

  return (
    <ActualSpendBreakdownSummary
      perspective={perspective}
      perspectiveComponent={getPerspective()}
      resolution={resolution}
      resolutionComponent={getResolution()}
      widgetId={widgetId}
    />
  );
};

export default ActualSpendBreakdownBase;
