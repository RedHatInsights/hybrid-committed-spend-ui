import { Button, Spinner, Stack, StackItem, Title } from '@patternfly/react-core';
import { Main } from '@redhat-cloud-services/frontend-components/Main';
import { PageHeader, PageHeaderTitle } from '@redhat-cloud-services/frontend-components/PageHeader';
import { addNotification } from '@redhat-cloud-services/frontend-components-notifications/redux';
import messages from 'locales/messages';
import React, { lazy, Suspense, useEffect } from 'react';
import { injectIntl, WrappedComponentProps } from 'react-intl';
import { useDispatch } from 'react-redux';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
const SampleComponent = lazy(() => import('routes/views/components/SampleComponent/SampleComponent'));

import './Explorer.scss';

type ExplorerProps = RouteComponentProps<void> & WrappedComponentProps;

const Explorer: React.FC<ExplorerProps> = ({ intl }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    insights?.chrome?.appAction?.('sample-page');
  }, []);

  const handleAlert = () => {
    dispatch(
      addNotification({
        description: 'notification description',
        title: 'Notification title',
        variant: 'success',
      })
    );
  };

  return (
    <React.Fragment>
      <PageHeader>
        <PageHeaderTitle title={intl.formatMessage(messages.hcs)} />
      </PageHeader>
      <Main>
        <Stack hasGutter>
          <StackItem>
            <Title headingLevel="h2" size="3xl">
              {' '}
              Alerts{' '}
            </Title>
            <Button variant="primary" onClick={handleAlert}>
              {' '}
              Dispatch alert{' '}
            </Button>
          </StackItem>
          <StackItem>
            <Suspense fallback={<Spinner />}>
              <SampleComponent />
            </Suspense>
          </StackItem>
          <StackItem>
            <Stack hasGutter>
              <StackItem>
                <Title headingLevel="h2" size="3xl">
                  {' '}
                  Links{' '}
                </Title>
              </StackItem>
              <StackItem>
                <Link to="/oops"> How to handle 500s in app </Link>
              </StackItem>
              <StackItem>
                <Link to="/no-permissions"> How to handle 403s in app </Link>
              </StackItem>
            </Stack>
          </StackItem>
        </Stack>
      </Main>
    </React.Fragment>
  );
};

export default injectIntl(withRouter(Explorer));
