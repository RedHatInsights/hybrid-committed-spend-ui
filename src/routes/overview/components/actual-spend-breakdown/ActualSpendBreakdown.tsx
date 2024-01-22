import messages from 'locales/messages';
import React, { useState } from 'react';
import { Perspective } from 'routes/components/perspective';
import type { SelectWrapperOption } from 'routes/components/selectWrapper';
import { isHcsDataVisibilitySummaryOnly, useUserAccessMapToProps } from 'utils/userAccess';

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
  const { userAccess } = useUserAccessMapToProps();

  const getPerspective = () => {
    return <Perspective currentItem={perspective} onSelect={handleOnPerspectiveSelect} options={perspectiveOptions} />;
  };

  const getResolution = () => {
    return <Perspective currentItem={resolution} onSelect={handleOnResolutionSelect} options={resolutionOptions} />;
  };

  const handleOnPerspectiveSelect = (_evt, selection: SelectWrapperOption) => {
    switch (selection.value) {
      case PerspectiveType.affiliate:
        setPerspective(PerspectiveType.affiliate);
        break;
      case PerspectiveType.product:
        setPerspective(PerspectiveType.product);
        break;
      case PerspectiveType.sourceOfSpend:
        setPerspective(PerspectiveType.sourceOfSpend);
        break;
    }
  };

  const handleOnResolutionSelect = (_evt, selection: SelectWrapperOption) => {
    switch (selection.value) {
      case ResolutionType.cumulative:
        setResolution(ResolutionType.cumulative);
        break;
      case ResolutionType.monthly:
        setResolution(ResolutionType.monthly);
        break;
    }
  };

  return (
    <ActualSpendBreakdownSummary
      isDataVisibilitySummaryOnly={isHcsDataVisibilitySummaryOnly(userAccess)}
      perspective={perspective}
      perspectiveComponent={getPerspective()}
      resolution={resolution}
      resolutionComponent={getResolution()}
      widgetId={widgetId}
    />
  );
};

export default ActualSpendBreakdownBase;
