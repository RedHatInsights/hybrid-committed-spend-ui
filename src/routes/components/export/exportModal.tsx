import { MessageDescriptor } from '@formatjs/intl/src/types';
import { Alert, Button, ButtonVariant, Form, FormGroup, Grid, GridItem, Modal, Radio } from '@patternfly/react-core';
import { Query } from 'api/queries/query';
import { ReportPathsType } from 'api/reports/report';
import { AxiosError } from 'axios';
import messages from 'locales/messages';
import React from 'react';
import { injectIntl, WrappedComponentProps } from 'react-intl';
import { connect } from 'react-redux';
import { createMapStateToProps } from 'store/common';
import { exportActions } from 'store/export';
import { ComputedReportItem } from 'utils/computedReport/getComputedReportItems';

import { styles } from './exportModal.styles';
import { ExportSubmit } from './exportSubmit';

export interface ExportModalOwnProps {
  endDate?: string;
  groupBy?: string;
  isOpen: boolean;
  items?: ComputedReportItem[];
  onClose(isOpen: boolean);
  query?: Query;
  queryString?: string;
  reportPathsType: ReportPathsType;
  showDataType?: boolean; // Format type; JSON / raw
  startDate?: string;
}

interface ExportModalStateProps {
  isExportsFeatureEnabled?: boolean;
}

interface ExportModalDispatchProps {
  exportReport?: typeof exportActions.exportReport;
}

interface ExportModalState {
  dataType: 'json' | 'raw';
  error?: AxiosError;
}

type ExportModalProps = ExportModalOwnProps & ExportModalDispatchProps & ExportModalStateProps & WrappedComponentProps;

const dataTypeOptions: {
  label: MessageDescriptor;
  value: string;
}[] = [
  { label: messages.exportDataType, value: 'json' },
  { label: messages.exportDataType, value: 'raw' },
];

export class ExportModalBase extends React.Component<ExportModalProps, ExportModalState> {
  protected defaultState: ExportModalState = {
    dataType: 'json',
    error: undefined,
  };
  public state: ExportModalState = { ...this.defaultState };

  constructor(stateProps, dispatchProps) {
    super(stateProps, dispatchProps);
    this.handleDataTypeChange = this.handleDataTypeChange.bind(this);
  }

  // Reset default state upon close -- see https://issues.redhat.com/browse/COST-1134
  private handleClose = () => {
    this.setState({ ...this.defaultState }, () => {
      this.props.onClose(false);
    });
  };

  private handleError = (error: AxiosError) => {
    this.setState({ error });
  };

  private handleDataTypeChange = (_, event) => {
    this.setState({ dataType: event.currentTarget.value });
  };

  public render() {
    const { endDate, groupBy, intl, items, query, reportPathsType, startDate } = this.props;
    const { error, dataType } = this.state;

    return (
      <Modal
        style={styles.modal}
        isOpen={this.props.isOpen}
        onClose={this.handleClose}
        title={intl.formatMessage(messages.exportTitle)}
        variant="small"
        actions={[
          <ExportSubmit
            dataType={dataType}
            endDate={endDate}
            groupBy={groupBy}
            items={items}
            key="confirm"
            onClose={this.handleClose}
            onError={this.handleError}
            query={query}
            reportPathsType={reportPathsType}
            startDate={startDate}
          />,
          <Button key="cancel" onClick={this.handleClose} variant={ButtonVariant.link}>
            {intl.formatMessage(messages.cancel)}
          </Button>,
        ]}
      >
        {error && <Alert variant="danger" style={styles.alert} title={intl.formatMessage(messages.exportError)} />}
        <div style={styles.title}>
          <span>{intl.formatMessage(messages.exportHeading, { groupBy })}</span>
        </div>
        <Form style={styles.form}>
          <Grid hasGutter md={6}>
            <GridItem span={12}>
              <FormGroup fieldId="formatType" label={intl.formatMessage(messages.exportDataTypeTitle)} isRequired>
                {dataTypeOptions.map((option, index) => (
                  <Radio
                    key={index}
                    id={`formatType-${index}`}
                    isValid={option.value !== undefined}
                    label={intl.formatMessage(option.label, { value: option.value })}
                    value={option.value}
                    checked={dataType === option.value}
                    name="formatType"
                    onChange={this.handleDataTypeChange}
                    aria-label={intl.formatMessage(option.label, { value: option.value })}
                  />
                ))}
              </FormGroup>
            </GridItem>
          </Grid>
        </Form>
      </Modal>
    );
  }
}

const mapStateToProps = createMapStateToProps<ExportModalOwnProps, unknown>(() => {
  return {
    // TBD...
  };
});

const mapDispatchToProps: ExportModalDispatchProps = {
  exportReport: exportActions.exportReport,
};

const ExportModalConnect = connect(mapStateToProps, mapDispatchToProps)(ExportModalBase);
const ExportModal = injectIntl(ExportModalConnect);

export default ExportModal;
