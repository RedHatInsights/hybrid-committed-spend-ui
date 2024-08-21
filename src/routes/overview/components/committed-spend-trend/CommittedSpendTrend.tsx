import messages from 'locales/messages';
import { cloneDeep } from 'lodash';
import React, { useEffect, useState } from 'react';
import { Perspective } from 'routes/components/perspective';
import type { PerspectiveOption } from 'routes/components/perspective/Perspective';
import type { SelectWrapperOption } from 'routes/components/selectWrapper';
import { useAccountSummaryMapToProps } from 'routes/utils/accountSummary';

import { CommittedSpendTrendSummary } from './CommittedSpendTrendSummary';

interface CommittedSpendTrendOwnProps {
  widgetId: number;
}

interface CommittedSpendTrendStateProps {
  hasPreviousData?: boolean;
}

export type CommittedSpendTrendProps = CommittedSpendTrendOwnProps;

export enum PerspectiveType {
  actual = 'actual',
  previous_over_actual = 'previous_over_actual',
}

const perspectiveOptions: PerspectiveOption[] = [
  { label: messages.committedSpendTrendPerspectiveValues, value: PerspectiveType.actual },
  { label: messages.committedSpendTrendPerspectiveValues, value: PerspectiveType.previous_over_actual },
];

const CommittedSpendTrend: React.FC<CommittedSpendTrendProps> = ({ widgetId }) => {
  const { hasPreviousData } = useMapToProps();
  const [perspective, setPerspective] = useState<PerspectiveType>();

  const getPerspectiveOptions = () => {
    const newOptions = cloneDeep(perspectiveOptions);

    newOptions.map(option => {
      switch (option.value) {
        case PerspectiveType.previous_over_actual:
          option.isDisabled = !hasPreviousData;
          break;
        default:
          break;
      }
    });
    return newOptions;
  };

  const getPerspective = () => {
    return (
      <Perspective currentItem={perspective} onSelect={handleOnPerspectiveSelect} options={getPerspectiveOptions()} />
    );
  };

  const handleOnPerspectiveSelect = (_evt, selection: SelectWrapperOption) => {
    switch (selection.value) {
      case PerspectiveType.actual:
        setPerspective(PerspectiveType.actual);
        break;
      case PerspectiveType.previous_over_actual:
        setPerspective(PerspectiveType.previous_over_actual);
        break;
    }
  };

  useEffect(() => {
    if (!perspective && hasPreviousData !== undefined) {
      setPerspective(hasPreviousData ? PerspectiveType.previous_over_actual : PerspectiveType.actual);
    }
  }, [hasPreviousData]);

  return (
    <CommittedSpendTrendSummary perspective={perspective} perspectiveComponent={getPerspective()} widgetId={widgetId} />
  );
};

const useMapToProps = (): CommittedSpendTrendStateProps => {
  const { summary } = useAccountSummaryMapToProps();
  const values = summary?.data?.length && summary.data[0];

  const hasPreviousContractLineEndDate = values && values.previous_contract_line_end_date !== null;
  const hasPreviousContractLineStartDate = values && values.previous_contract_line_start_date !== null;
  const hasPreviousData = hasPreviousContractLineEndDate && hasPreviousContractLineStartDate;

  return {
    hasPreviousData,
  };
};

export default CommittedSpendTrend;
