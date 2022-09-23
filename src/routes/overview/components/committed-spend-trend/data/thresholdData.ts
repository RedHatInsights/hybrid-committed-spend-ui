// https://console.stage.redhat.com/api/cost-management/v1/reports/openshift/costs/?start_date=2021-06-21&end_date=2021-09-19&filter[resolution]=monthly

export const thresholdData = {
  meta: {
    count: 4,
    start_date: '2021-12',
    end_date: '2022-12',
    filter: {
      resolution: 'monthly',
    },
    group_by: {},
    order_by: {},
    total: {
      infrastructure: {
        raw: {
          value: 34973.404931415294,
          units: 'USD',
        },
        markup: {
          value: 0,
          units: 'USD',
        },
        usage: {
          value: 123159.64748172043,
          units: 'USD',
        },
        distributed: {
          value: 3300,
          units: 'USD',
        },
        total: {
          value: 165733.0524131357,
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
          value: 83168.27,
          units: 'USD',
        },
        distributed: {
          value: 12000,
          units: 'USD',
        },
        total: {
          value: 99168.27,
          units: 'USD',
        },
      },
      cost: {
        raw: {
          value: 34973.404931415294,
          units: 'USD',
        },
        markup: {
          value: 0,
          units: 'USD',
        },
        usage: {
          value: 210327.91748172042,
          units: 'USD',
        },
        distributed: {
          value: 16600,
          units: 'USD',
        },
        total: {
          value: 110000,
          units: 'USD',
        },
      },
    },
  },
  links: {
    first:
      '/api/cost-management/v1/reports/openshift/costs/?end_date=2021-09-19&filter%5Bresolution%5D=monthly&limit=100&offset=0&start_date=2021-06-21',
    next: null,
    previous: null,
    last: '/api/cost-management/v1/reports/openshift/costs/?end_date=2021-09-19&filter%5Bresolution%5D=monthly&limit=100&offset=0&start_date=2021-06-21',
  },
  data: [
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
              value: 110000,
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
              value: 14659.23200374178,
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
              value: 9194.83,
              units: 'USD',
            },
            distributed: {
              value: 0,
              units: 'USD',
            },
            total: {
              value: 9194.83,
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
              value: 25756.892333333333,
              units: 'USD',
            },
            distributed: {
              value: 0,
              units: 'USD',
            },
            total: {
              value: 110000,
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
              value: 14659.23200374178,
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
              value: 9194.83,
              units: 'USD',
            },
            distributed: {
              value: 0,
              units: 'USD',
            },
            total: {
              value: 9194.83,
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
              value: 25756.892333333333,
              units: 'USD',
            },
            distributed: {
              value: 0,
              units: 'USD',
            },
            total: {
              value: 110000,
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
              value: 14659.23200374178,
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
              value: 9194.83,
              units: 'USD',
            },
            distributed: {
              value: 0,
              units: 'USD',
            },
            total: {
              value: 9194.83,
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
              value: 25756.892333333333,
              units: 'USD',
            },
            distributed: {
              value: 0,
              units: 'USD',
            },
            total: {
              value: 110000,
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
              value: 14659.23200374178,
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
              value: 9194.83,
              units: 'USD',
            },
            distributed: {
              value: 0,
              units: 'USD',
            },
            total: {
              value: 9194.83,
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
              value: 25756.892333333333,
              units: 'USD',
            },
            distributed: {
              value: 0,
              units: 'USD',
            },
            total: {
              value: 110000,
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
              value: 14659.23200374178,
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
              value: 9194.83,
              units: 'USD',
            },
            distributed: {
              value: 0,
              units: 'USD',
            },
            total: {
              value: 9194.83,
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
              value: 25756.892333333333,
              units: 'USD',
            },
            distributed: {
              value: 0,
              units: 'USD',
            },
            total: {
              value: 110000,
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
              value: 14659.23200374178,
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
              value: 9194.83,
              units: 'USD',
            },
            distributed: {
              value: 0,
              units: 'USD',
            },
            total: {
              value: 9194.83,
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
              value: 25756.892333333333,
              units: 'USD',
            },
            distributed: {
              value: 0,
              units: 'USD',
            },
            total: {
              value: 110000,
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
              value: 16465.337063191644,
              units: 'USD',
            },
            markup: {
              value: 0,
              units: 'USD',
            },
            usage: {
              value: 44021.8234483871,
              units: 'USD',
            },
            distributed: {
              value: 900,
              units: 'USD',
            },
            total: {
              value: 64687.16051157874,
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
              value: 30839.59,
              units: 'USD',
            },
            distributed: {
              value: 3000,
              units: 'USD',
            },
            total: {
              value: 36839.59,
              units: 'USD',
            },
          },
          cost: {
            raw: {
              value: 16465.337063191644,
              units: 'USD',
            },
            markup: {
              value: 0,
              units: 'USD',
            },
            usage: {
              value: 79861.4134483871,
              units: 'USD',
            },
            distributed: {
              value: 5900,
              units: 'USD',
            },
            total: {
              value: 110000,
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
              value: 11112.002783026552,
              units: 'USD',
            },
            markup: {
              value: 0,
              units: 'USD',
            },
            usage: {
              value: 29115.9718,
              units: 'USD',
            },
            distributed: {
              value: 900,
              units: 'USD',
            },
            total: {
              value: 41727.97458302655,
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
              value: 20712.32,
              units: 'USD',
            },
            distributed: {
              value: 3000,
              units: 'USD',
            },
            total: {
              value: 25712.32,
              units: 'USD',
            },
          },
          cost: {
            raw: {
              value: 11112.002783026552,
              units: 'USD',
            },
            markup: {
              value: 0,
              units: 'USD',
            },
            usage: {
              value: 52828.2918,
              units: 'USD',
            },
            distributed: {
              value: 5900,
              units: 'USD',
            },
            total: {
              value: 110000,
              units: 'USD',
            },
          },
        },
      ],
    },
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
              value: 6698.895414788647,
              units: 'USD',
            },
            markup: {
              value: 0,
              units: 'USD',
            },
            usage: {
              value: 27459.7899,
              units: 'USD',
            },
            distributed: {
              value: 900,
              units: 'USD',
            },
            total: {
              value: 34658.68531478865,
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
              value: 13421.53,
              units: 'USD',
            },
            distributed: {
              value: 3000,
              units: 'USD',
            },
            total: {
              value: 19421.53,
              units: 'USD',
            },
          },
          cost: {
            raw: {
              value: 6698.895414788647,
              units: 'USD',
            },
            markup: {
              value: 0,
              units: 'USD',
            },
            usage: {
              value: 43881.3199,
              units: 'USD',
            },
            distributed: {
              value: 5900,
              units: 'USD',
            },
            total: {
              value: 110000,
              units: 'USD',
            },
          },
        },
      ],
    },
    {
      date: '2022-10',
      values: [
        {
          date: '2022-10',
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
              value: 6698.895414788647,
              units: 'USD',
            },
            markup: {
              value: 0,
              units: 'USD',
            },
            usage: {
              value: 27459.7899,
              units: 'USD',
            },
            distributed: {
              value: 900,
              units: 'USD',
            },
            total: {
              value: 34658.68531478865,
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
              value: 13421.53,
              units: 'USD',
            },
            distributed: {
              value: 3000,
              units: 'USD',
            },
            total: {
              value: 19421.53,
              units: 'USD',
            },
          },
          cost: {
            raw: {
              value: 6698.895414788647,
              units: 'USD',
            },
            markup: {
              value: 0,
              units: 'USD',
            },
            usage: {
              value: 43881.3199,
              units: 'USD',
            },
            distributed: {
              value: 5900,
              units: 'USD',
            },
            total: {
              value: 110000,
              units: 'USD',
            },
          },
        },
      ],
    },
    {
      date: '2022-11',
      values: [
        {
          date: '2022-11',
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
              value: 6698.895414788647,
              units: 'USD',
            },
            markup: {
              value: 0,
              units: 'USD',
            },
            usage: {
              value: 27459.7899,
              units: 'USD',
            },
            distributed: {
              value: 900,
              units: 'USD',
            },
            total: {
              value: 34658.68531478865,
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
              value: 13421.53,
              units: 'USD',
            },
            distributed: {
              value: 3000,
              units: 'USD',
            },
            total: {
              value: 19421.53,
              units: 'USD',
            },
          },
          cost: {
            raw: {
              value: 6698.895414788647,
              units: 'USD',
            },
            markup: {
              value: 0,
              units: 'USD',
            },
            usage: {
              value: 43881.3199,
              units: 'USD',
            },
            distributed: {
              value: 5900,
              units: 'USD',
            },
            total: {
              value: 110000,
              units: 'USD',
            },
          },
        },
      ],
    },
    {
      date: '2022-12',
      values: [
        {
          date: '2022-12',
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
              value: 6698.895414788647,
              units: 'USD',
            },
            markup: {
              value: 0,
              units: 'USD',
            },
            usage: {
              value: 27459.7899,
              units: 'USD',
            },
            distributed: {
              value: 900,
              units: 'USD',
            },
            total: {
              value: 34658.68531478865,
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
              value: 13421.53,
              units: 'USD',
            },
            distributed: {
              value: 3000,
              units: 'USD',
            },
            total: {
              value: 19421.53,
              units: 'USD',
            },
          },
          cost: {
            raw: {
              value: 6698.895414788647,
              units: 'USD',
            },
            markup: {
              value: 0,
              units: 'USD',
            },
            usage: {
              value: 43881.3199,
              units: 'USD',
            },
            distributed: {
              value: 5900,
              units: 'USD',
            },
            total: {
              value: 110000,
              units: 'USD',
            },
          },
        },
      ],
    },
  ],
};
