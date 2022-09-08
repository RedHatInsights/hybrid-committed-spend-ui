import { MessageDescriptor } from '@formatjs/intl/src/types';
import { ReportPathsType, ReportType } from 'api/reports/report';

export interface DashboardWidget<T> {
  id: number;
  filter?: any;
  reportPathsType?: ReportPathsType;
  reportType?: ReportType;
  title?: MessageDescriptor;
  type: T;
}
