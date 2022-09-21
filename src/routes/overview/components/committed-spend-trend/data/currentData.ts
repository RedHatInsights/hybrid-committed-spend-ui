// https://console.stage.redhat.com/api/cost-management/v1/reports/openshift/costs/?start_date=2022-06-21&end_date=2022-09-19&filter[resolution]=monthly

export const currentData = {
  meta: {
    count: 4,
    start_date: '2021-08',
    end_date: '2022-09',
    filter: {
      resolution: 'monthly',
    },
    group_by: {},
    order_by: {},
    total: {
      infrastructure: {
        raw: {
          value: 38973.404931415294,
          units: 'USD',
        },
        markup: {
          value: 0,
          units: 'USD',
        },
        usage: {
          value: 126159.64748172043,
          units: 'USD',
        },
        distributed: {
          value: 3600,
          units: 'USD',
        },
        total: {
          value: 168733.0524131357,
          units: 'USD',
        },
      },
      supplementary: {
        raw: {
          value: 0,
          units: 'USD',
        },
        markup: {
          value: 0,
          units: 'USD',
        },
        usage: {
          value: 87168.27,
          units: 'USD',
        },
        distributed: {
          value: 15000,
          units: 'USD',
        },
        total: {
          value: 102168.27,
          units: 'USD',
        },
      },
      cost: {
        raw: {
          value: 38973.404931415294,
          units: 'USD',
        },
        markup: {
          value: 0,
          units: 'USD',
        },
        usage: {
          value: 213327.91748172042,
          units: 'USD',
        },
        distributed: {
          value: 18600,
          units: 'USD',
        },
        total: {
          value: 270901.3224131357,
          units: 'USD',
        },
      },
    },
  },
  links: {
    first:
      '/api/cost-management/v1/reports/openshift/costs/?end_date=2022-09-19&filter%5Bresolution%5D=monthly&limit=100&offset=0&start_date=2022-06-21',
    next: null,
    previous: null,
    last: '/api/cost-management/v1/reports/openshift/costs/?end_date=2022-09-19&filter%5Bresolution%5D=monthly&limit=100&offset=0&start_date=2022-06-21',
  },
  data: [
    {
      date: '2021-10',
      values: [
        {
          date: '2021-10',
          clusters: [
            'OpenShift on AWS - Nise Populator',
            'OpenShift on Azure - Nise Populator',
            'OpenShift on GCP - Nise Populator',
            'OpenShift on OpenStack - Nise Populator',
          ],
          source_uuid: [
            '1899fc34-7096-47d6-82d8-e371268530b1',
            '7b2cf7da-d494-4f4d-b640-f9fa57a0fe1c',
            'a99443de-af6d-4b4b-a1d9-fdeea529606d',
            'ae7cd5c5-b6b8-4059-966d-0548287cb609',
          ],
          infrastructure: {
            raw: {
              value: 797.1696704084493,
              units: 'USD',
            },
            markup: {
              value: 0,
              units: 'USD',
            },
            usage: {
              value: 13562.062333333335,
              units: 'USD',
            },
            distributed: {
              value: 0,
              units: 'USD',
            },
            total: {
              value: 13659.23200374178,
              units: 'USD',
            },
          },
          supplementary: {
            raw: {
              value: 0,
              units: 'USD',
            },
            markup: {
              value: 0,
              units: 'USD',
            },
            usage: {
              value: 8194.83,
              units: 'USD',
            },
            distributed: {
              value: 0,
              units: 'USD',
            },
            total: {
              value: 19194.83,
              units: 'USD',
            },
          },
          cost: {
            raw: {
              value: 797.1696704084493,
              units: 'USD',
            },
            markup: {
              value: 0,
              units: 'USD',
            },
            usage: {
              value: 23756.892333333333,
              units: 'USD',
            },
            distributed: {
              value: 0,
              units: 'USD',
            },
            total: {
              value: 19854.062003741783,
              units: 'USD',
            },
          },
        },
      ],
    },
    {
      date: '2021-11',
      values: [
        {
          date: '2021-11',
          clusters: [
            'OpenShift on AWS - Nise Populator',
            'OpenShift on Azure - Nise Populator',
            'OpenShift on GCP - Nise Populator',
            'OpenShift on OpenStack - Nise Populator',
          ],
          source_uuid: [
            '1899fc34-7096-47d6-82d8-e371268530b1',
            '7b2cf7da-d494-4f4d-b640-f9fa57a0fe1c',
            'a99443de-af6d-4b4b-a1d9-fdeea529606d',
            'ae7cd5c5-b6b8-4059-966d-0548287cb609',
          ],
          infrastructure: {
            raw: {
              value: 897.1696704084493,
              units: 'USD',
            },
            markup: {
              value: 0,
              units: 'USD',
            },
            usage: {
              value: 14562.062333333335,
              units: 'USD',
            },
            distributed: {
              value: 0,
              units: 'USD',
            },
            total: {
              value: 15659.23200374178,
              units: 'USD',
            },
          },
          supplementary: {
            raw: {
              value: 0,
              units: 'USD',
            },
            markup: {
              value: 0,
              units: 'USD',
            },
            usage: {
              value: 10194.83,
              units: 'USD',
            },
            distributed: {
              value: 0,
              units: 'USD',
            },
            total: {
              value: 10194.83,
              units: 'USD',
            },
          },
          cost: {
            raw: {
              value: 897.1696704084493,
              units: 'USD',
            },
            markup: {
              value: 0,
              units: 'USD',
            },
            usage: {
              value: 24756.892333333333,
              units: 'USD',
            },
            distributed: {
              value: 0,
              units: 'USD',
            },
            total: {
              value: 19854.062003741783,
              units: 'USD',
            },
          },
        },
      ],
    },
    {
      date: '2021-12',
      values: [
        {
          date: '2021-12',
          clusters: [
            'OpenShift on AWS - Nise Populator',
            'OpenShift on Azure - Nise Populator',
            'OpenShift on GCP - Nise Populator',
            'OpenShift on OpenStack - Nise Populator',
          ],
          source_uuid: [
            '1899fc34-7096-47d6-82d8-e371268530b1',
            '7b2cf7da-d494-4f4d-b640-f9fa57a0fe1c',
            'a99443de-af6d-4b4b-a1d9-fdeea529606d',
            'ae7cd5c5-b6b8-4059-966d-0548287cb609',
          ],
          infrastructure: {
            raw: {
              value: 997.1696704084493,
              units: 'USD',
            },
            markup: {
              value: 0,
              units: 'USD',
            },
            usage: {
              value: 14562.062333333335,
              units: 'USD',
            },
            distributed: {
              value: 0,
              units: 'USD',
            },
            total: {
              value: 15659.23200374178,
              units: 'USD',
            },
          },
          supplementary: {
            raw: {
              value: 0,
              units: 'USD',
            },
            markup: {
              value: 0,
              units: 'USD',
            },
            usage: {
              value: 10194.83,
              units: 'USD',
            },
            distributed: {
              value: 0,
              units: 'USD',
            },
            total: {
              value: 10194.83,
              units: 'USD',
            },
          },
          cost: {
            raw: {
              value: 997.1696704084493,
              units: 'USD',
            },
            markup: {
              value: 0,
              units: 'USD',
            },
            usage: {
              value: 26756.892333333333,
              units: 'USD',
            },
            distributed: {
              value: 0,
              units: 'USD',
            },
            total: {
              value: 21854.062003741783,
              units: 'USD',
            },
          },
        },
      ],
    },
    {
      date: '2022-01',
      values: [
        {
          date: '2022-01',
          clusters: [
            'OpenShift on AWS - Nise Populator',
            'OpenShift on Azure - Nise Populator',
            'OpenShift on GCP - Nise Populator',
            'OpenShift on OpenStack - Nise Populator',
          ],
          source_uuid: [
            '1899fc34-7096-47d6-82d8-e371268530b1',
            '7b2cf7da-d494-4f4d-b640-f9fa57a0fe1c',
            'a99443de-af6d-4b4b-a1d9-fdeea529606d',
            'ae7cd5c5-b6b8-4059-966d-0548287cb609',
          ],
          infrastructure: {
            raw: {
              value: 1097.1696704084493,
              units: 'USD',
            },
            markup: {
              value: 0,
              units: 'USD',
            },
            usage: {
              value: 16562.062333333335,
              units: 'USD',
            },
            distributed: {
              value: 0,
              units: 'USD',
            },
            total: {
              value: 17659.23200374178,
              units: 'USD',
            },
          },
          supplementary: {
            raw: {
              value: 0,
              units: 'USD',
            },
            markup: {
              value: 0,
              units: 'USD',
            },
            usage: {
              value: 12194.83,
              units: 'USD',
            },
            distributed: {
              value: 0,
              units: 'USD',
            },
            total: {
              value: 12194.83,
              units: 'USD',
            },
          },
          cost: {
            raw: {
              value: 1097.1696704084493,
              units: 'USD',
            },
            markup: {
              value: 0,
              units: 'USD',
            },
            usage: {
              value: 28756.892333333333,
              units: 'USD',
            },
            distributed: {
              value: 0,
              units: 'USD',
            },
            total: {
              value: 23854.062003741783,
              units: 'USD',
            },
          },
        },
      ],
    },
    {
      date: '2022-02',
      values: [
        {
          date: '2022-02',
          clusters: [
            'OpenShift on AWS - Nise Populator',
            'OpenShift on Azure - Nise Populator',
            'OpenShift on GCP - Nise Populator',
            'OpenShift on OpenStack - Nise Populator',
          ],
          source_uuid: [
            '1899fc34-7096-47d6-82d8-e371268530b1',
            '7b2cf7da-d494-4f4d-b640-f9fa57a0fe1c',
            'a99443de-af6d-4b4b-a1d9-fdeea529606d',
            'ae7cd5c5-b6b8-4059-966d-0548287cb609',
          ],
          infrastructure: {
            raw: {
              value: 1097.1696704084493,
              units: 'USD',
            },
            markup: {
              value: 0,
              units: 'USD',
            },
            usage: {
              value: 16562.062333333335,
              units: 'USD',
            },
            distributed: {
              value: 0,
              units: 'USD',
            },
            total: {
              value: 17659.23200374178,
              units: 'USD',
            },
          },
          supplementary: {
            raw: {
              value: 0,
              units: 'USD',
            },
            markup: {
              value: 0,
              units: 'USD',
            },
            usage: {
              value: 12194.83,
              units: 'USD',
            },
            distributed: {
              value: 0,
              units: 'USD',
            },
            total: {
              value: 12194.83,
              units: 'USD',
            },
          },
          cost: {
            raw: {
              value: 1097.1696704084493,
              units: 'USD',
            },
            markup: {
              value: 0,
              units: 'USD',
            },
            usage: {
              value: 28756.892333333333,
              units: 'USD',
            },
            distributed: {
              value: 0,
              units: 'USD',
            },
            total: {
              value: 25854.062003741783,
              units: 'USD',
            },
          },
        },
      ],
    },
    {
      date: '2022-03',
      values: [
        {
          date: '2022-03',
          clusters: [
            'OpenShift on AWS - Nise Populator',
            'OpenShift on Azure - Nise Populator',
            'OpenShift on GCP - Nise Populator',
            'OpenShift on OpenStack - Nise Populator',
          ],
          source_uuid: [
            '1899fc34-7096-47d6-82d8-e371268530b1',
            '7b2cf7da-d494-4f4d-b640-f9fa57a0fe1c',
            'a99443de-af6d-4b4b-a1d9-fdeea529606d',
            'ae7cd5c5-b6b8-4059-966d-0548287cb609',
          ],
          infrastructure: {
            raw: {
              value: 1097.1696704084493,
              units: 'USD',
            },
            markup: {
              value: 0,
              units: 'USD',
            },
            usage: {
              value: 16562.062333333335,
              units: 'USD',
            },
            distributed: {
              value: 0,
              units: 'USD',
            },
            total: {
              value: 17659.23200374178,
              units: 'USD',
            },
          },
          supplementary: {
            raw: {
              value: 0,
              units: 'USD',
            },
            markup: {
              value: 0,
              units: 'USD',
            },
            usage: {
              value: 12194.83,
              units: 'USD',
            },
            distributed: {
              value: 0,
              units: 'USD',
            },
            total: {
              value: 12194.83,
              units: 'USD',
            },
          },
          cost: {
            raw: {
              value: 1097.1696704084493,
              units: 'USD',
            },
            markup: {
              value: 0,
              units: 'USD',
            },
            usage: {
              value: 28756.892333333333,
              units: 'USD',
            },
            distributed: {
              value: 0,
              units: 'USD',
            },
            total: {
              value: 26854.062003741783,
              units: 'USD',
            },
          },
        },
      ],
    },
    {
      date: '2022-04',
      values: [
        {
          date: '2022-04',
          clusters: [
            'OpenShift on AWS - Nise Populator',
            'OpenShift on Azure - Nise Populator',
            'OpenShift on GCP - Nise Populator',
            'OpenShift on OpenStack - Nise Populator',
          ],
          source_uuid: [
            '1899fc34-7096-47d6-82d8-e371268530b1',
            '7b2cf7da-d494-4f4d-b640-f9fa57a0fe1c',
            'a99443de-af6d-4b4b-a1d9-fdeea529606d',
            'ae7cd5c5-b6b8-4059-966d-0548287cb609',
          ],
          infrastructure: {
            raw: {
              value: 1097.1696704084493,
              units: 'USD',
            },
            markup: {
              value: 0,
              units: 'USD',
            },
            usage: {
              value: 16562.062333333335,
              units: 'USD',
            },
            distributed: {
              value: 0,
              units: 'USD',
            },
            total: {
              value: 17659.23200374178,
              units: 'USD',
            },
          },
          supplementary: {
            raw: {
              value: 0,
              units: 'USD',
            },
            markup: {
              value: 0,
              units: 'USD',
            },
            usage: {
              value: 12194.83,
              units: 'USD',
            },
            distributed: {
              value: 0,
              units: 'USD',
            },
            total: {
              value: 12194.83,
              units: 'USD',
            },
          },
          cost: {
            raw: {
              value: 1097.1696704084493,
              units: 'USD',
            },
            markup: {
              value: 0,
              units: 'USD',
            },
            usage: {
              value: 28756.892333333333,
              units: 'USD',
            },
            distributed: {
              value: 0,
              units: 'USD',
            },
            total: {
              value: 27854.062003741783,
              units: 'USD',
            },
          },
        },
      ],
    },
    {
      date: '2022-05',
      values: [
        {
          date: '2022-05',
          clusters: [
            'OpenShift on AWS - Nise Populator',
            'OpenShift on Azure - Nise Populator',
            'OpenShift on GCP - Nise Populator',
            'OpenShift on OpenStack - Nise Populator',
          ],
          source_uuid: [
            '1899fc34-7096-47d6-82d8-e371268530b1',
            '7b2cf7da-d494-4f4d-b640-f9fa57a0fe1c',
            'a99443de-af6d-4b4b-a1d9-fdeea529606d',
            'ae7cd5c5-b6b8-4059-966d-0548287cb609',
          ],
          infrastructure: {
            raw: {
              value: 1097.1696704084493,
              units: 'USD',
            },
            markup: {
              value: 0,
              units: 'USD',
            },
            usage: {
              value: 16562.062333333335,
              units: 'USD',
            },
            distributed: {
              value: 0,
              units: 'USD',
            },
            total: {
              value: 17659.23200374178,
              units: 'USD',
            },
          },
          supplementary: {
            raw: {
              value: 0,
              units: 'USD',
            },
            markup: {
              value: 0,
              units: 'USD',
            },
            usage: {
              value: 12194.83,
              units: 'USD',
            },
            distributed: {
              value: 0,
              units: 'USD',
            },
            total: {
              value: 12194.83,
              units: 'USD',
            },
          },
          cost: {
            raw: {
              value: 1097.1696704084493,
              units: 'USD',
            },
            markup: {
              value: 0,
              units: 'USD',
            },
            usage: {
              value: 28756.892333333333,
              units: 'USD',
            },
            distributed: {
              value: 0,
              units: 'USD',
            },
            total: {
              value: 28854.062003741783,
              units: 'USD',
            },
          },
        },
      ],
    },
    {
      date: '2022-06',
      values: [
        {
          date: '2022-06',
          clusters: [
            'OpenShift on AWS - Nise Populator',
            'OpenShift on Azure - Nise Populator',
            'OpenShift on GCP - Nise Populator',
            'OpenShift on OpenStack - Nise Populator',
          ],
          source_uuid: [
            '1899fc34-7096-47d6-82d8-e371268530b1',
            '7b2cf7da-d494-4f4d-b640-f9fa57a0fe1c',
            'a99443de-af6d-4b4b-a1d9-fdeea529606d',
            'ae7cd5c5-b6b8-4059-966d-0548287cb609',
          ],
          infrastructure: {
            raw: {
              value: 1097.1696704084493,
              units: 'USD',
            },
            markup: {
              value: 0,
              units: 'USD',
            },
            usage: {
              value: 16562.062333333335,
              units: 'USD',
            },
            distributed: {
              value: 0,
              units: 'USD',
            },
            total: {
              value: 17659.23200374178,
              units: 'USD',
            },
          },
          supplementary: {
            raw: {
              value: 0,
              units: 'USD',
            },
            markup: {
              value: 0,
              units: 'USD',
            },
            usage: {
              value: 12194.83,
              units: 'USD',
            },
            distributed: {
              value: 0,
              units: 'USD',
            },
            total: {
              value: 12194.83,
              units: 'USD',
            },
          },
          cost: {
            raw: {
              value: 1097.1696704084493,
              units: 'USD',
            },
            markup: {
              value: 0,
              units: 'USD',
            },
            usage: {
              value: 28756.892333333333,
              units: 'USD',
            },
            distributed: {
              value: 0,
              units: 'USD',
            },
            total: {
              value: 29854.062003741783,
              units: 'USD',
            },
          },
        },
      ],
    },
    {
      date: '2022-07',
      values: [
        {
          date: '2022-07',
          clusters: [
            'OpenShift on AWS - Nise Populator',
            'OpenShift on Azure - Nise Populator',
            'OpenShift on GCP - Nise Populator',
            'OpenShift on OpenStack - Nise Populator',
          ],
          source_uuid: [
            '1899fc34-7096-47d6-82d8-e371268530b1',
            '7b2cf7da-d494-4f4d-b640-f9fa57a0fe1c',
            'a99443de-af6d-4b4b-a1d9-fdeea529606d',
            'ae7cd5c5-b6b8-4059-966d-0548287cb609',
          ],
          infrastructure: {
            raw: {
              value: 19465.337063191644,
              units: 'USD',
            },
            markup: {
              value: 0,
              units: 'USD',
            },
            usage: {
              value: 47021.8234483871,
              units: 'USD',
            },
            distributed: {
              value: 1200,
              units: 'USD',
            },
            total: {
              value: 67687.16051157874,
              units: 'USD',
            },
          },
          supplementary: {
            raw: {
              value: 0,
              units: 'USD',
            },
            markup: {
              value: 0,
              units: 'USD',
            },
            usage: {
              value: 34839.59,
              units: 'USD',
            },
            distributed: {
              value: 5000,
              units: 'USD',
            },
            total: {
              value: 39839.59,
              units: 'USD',
            },
          },
          cost: {
            raw: {
              value: 19465.337063191644,
              units: 'USD',
            },
            markup: {
              value: 0,
              units: 'USD',
            },
            usage: {
              value: 81861.4134483871,
              units: 'USD',
            },
            distributed: {
              value: 6200,
              units: 'USD',
            },
            total: {
              value: 107526.75051157874,
              units: 'USD',
            },
          },
        },
      ],
    },
    {
      date: '2022-08',
      values: [
        {
          date: '2022-08',
          clusters: [
            'OpenShift on AWS - Nise Populator',
            'OpenShift on Azure - Nise Populator',
            'OpenShift on GCP - Nise Populator',
            'OpenShift on OpenStack - Nise Populator',
          ],
          source_uuid: [
            '1899fc34-7096-47d6-82d8-e371268530b1',
            '7b2cf7da-d494-4f4d-b640-f9fa57a0fe1c',
            'a99443de-af6d-4b4b-a1d9-fdeea529606d',
            'ae7cd5c5-b6b8-4059-966d-0548287cb609',
          ],
          infrastructure: {
            raw: {
              value: 11412.002783026552,
              units: 'USD',
            },
            markup: {
              value: 0,
              units: 'USD',
            },
            usage: {
              value: 32115.9718,
              units: 'USD',
            },
            distributed: {
              value: 1200,
              units: 'USD',
            },
            total: {
              value: 44727.97458302655,
              units: 'USD',
            },
          },
          supplementary: {
            raw: {
              value: 0,
              units: 'USD',
            },
            markup: {
              value: 0,
              units: 'USD',
            },
            usage: {
              value: 23712.32,
              units: 'USD',
            },
            distributed: {
              value: 5000,
              units: 'USD',
            },
            total: {
              value: 28712.32,
              units: 'USD',
            },
          },
          cost: {
            raw: {
              value: 11412.002783026552,
              units: 'USD',
            },
            markup: {
              value: 0,
              units: 'USD',
            },
            usage: {
              value: 55828.2918,
              units: 'USD',
            },
            distributed: {
              value: 6200,
              units: 'USD',
            },
            total: {
              value: 73440.29458302655,
              units: 'USD',
            },
          },
        },
      ],
    },
    /*
    {
      date: '2022-09',
      values: [
        {
          date: '2022-09',
          clusters: [
            'OpenShift on AWS - Nise Populator',
            'OpenShift on Azure - Nise Populator',
            'OpenShift on GCP - Nise Populator',
            'OpenShift on OpenStack - Nise Populator',
          ],
          source_uuid: [
            '1899fc34-7096-47d6-82d8-e371268530b1',
            '7b2cf7da-d494-4f4d-b640-f9fa57a0fe1c',
            'a99443de-af6d-4b4b-a1d9-fdeea529606d',
            'ae7cd5c5-b6b8-4059-966d-0548287cb609',
          ],
          infrastructure: {
            raw: {
              value: 6998.895414788647,
              units: 'USD',
            },
            markup: {
              value: 0,
              units: 'USD',
            },
            usage: {
              value: 30459.7899,
              units: 'USD',
            },
            distributed: {
              value: 1200,
              units: 'USD',
            },
            total: {
              value: 38658.68531478865,
              units: 'USD',
            },
          },
          supplementary: {
            raw: {
              value: 0,
              units: 'USD',
            },
            markup: {
              value: 0,
              units: 'USD',
            },
            usage: {
              value: 16421.53,
              units: 'USD',
            },
            distributed: {
              value: 5000,
              units: 'USD',
            },
            total: {
              value: 21421.53,
              units: 'USD',
            },
          },
          cost: {
            raw: {
              value: 6998.895414788647,
              units: 'USD',
            },
            markup: {
              value: 0,
              units: 'USD',
            },
            usage: {
              value: 46881.3199,
              units: 'USD',
            },
            distributed: {
              value: 6200,
              units: 'USD',
            },
            total: {
              value: 60080.21531478865,
              units: 'USD',
            },
          },
        },
      ],
    },

     */
  ],
};
