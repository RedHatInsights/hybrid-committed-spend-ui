// https://console.stage.redhat.com/api/cost-management/v1/reports/openshift/costs/?filter[limit]=10&filter[offset]=0&group_by[project]=*&start_date=2022-06-21&end_date=2022-09-19&filter[resolution]=monthly

export const currentDataReport = {
  meta: {
    count: 25,
    others: 15,
    start_date: '2022-06-21',
    end_date: '2022-09-19',
    filter: {
      resolution: 'monthly',
      limit: 10,
      offset: 0,
    },
    group_by: {
      project: ['*'],
    },
    order_by: {},
    total: {
      infrastructure: {
        raw: {
          value: 34361.72126798656,
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
          value: 164121.36874970698,
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
          value: 34361.72126798656,
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
          value: 266289.63874970697,
          units: 'USD',
        },
      },
    },
  },
  links: {
    first:
      '/api/cost-management/v1/reports/openshift/costs/?end_date=2022-09-19&filter%5Blimit%5D=10&filter%5Boffset%5D=0&filter%5Bresolution%5D=monthly&group_by%5Bproject%5D=%2A&start_date=2022-06-21',
    next: '/api/cost-management/v1/reports/openshift/costs/?end_date=2022-09-19&filter%5Blimit%5D=10&filter%5Boffset%5D=10&filter%5Bresolution%5D=monthly&group_by%5Bproject%5D=%2A&start_date=2022-06-21',
    previous: null,
    last: '/api/cost-management/v1/reports/openshift/costs/?end_date=2022-09-19&filter%5Blimit%5D=10&filter%5Boffset%5D=15&filter%5Bresolution%5D=monthly&group_by%5Bproject%5D=%2A&start_date=2022-06-21',
  },
  data: [
    {
      date: '2022-06',
      projects: [
        {
          project: 'analytics',
          values: [
            {
              date: '2022-06',
              project: 'analytics',
              source_uuid: ['7b2cf7da-d494-4f4d-b640-f9fa57a0fe1c', 'a99443de-af6d-4b4b-a1d9-fdeea529606d'],
              clusters: ['OpenShift on AWS - Nise Populator', 'OpenShift on GCP - Nise Populator'],
              infrastructure: {
                raw: {
                  value: 423.85296603862423,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 0,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 423.85296603862423,
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
                  value: 3680,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 3680,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 423.85296603862423,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 3680,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 4103.852966038624,
                  units: 'USD',
                },
              },
            },
          ],
        },
        {
          project: 'openshift',
          values: [
            {
              date: '2022-06',
              project: 'openshift',
              source_uuid: [
                '1899fc34-7096-47d6-82d8-e371268530b1',
                '7b2cf7da-d494-4f4d-b640-f9fa57a0fe1c',
                'a99443de-af6d-4b4b-a1d9-fdeea529606d',
                'ae7cd5c5-b6b8-4059-966d-0548287cb609',
              ],
              clusters: [
                'OpenShift on AWS - Nise Populator',
                'OpenShift on Azure - Nise Populator',
                'OpenShift on GCP - Nise Populator',
                'OpenShift on OpenStack - Nise Populator',
              ],
              infrastructure: {
                raw: {
                  value: 61.971718798429,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 1182.9935,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 1244.965218798429,
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
                  value: 1048.39,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 1048.39,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 61.971718798429,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 2231.3835,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 2293.355218798429,
                  units: 'USD',
                },
              },
            },
          ],
        },
        {
          project: 'cost-management',
          values: [
            {
              date: '2022-06',
              project: 'cost-management',
              source_uuid: ['7b2cf7da-d494-4f4d-b640-f9fa57a0fe1c', 'a99443de-af6d-4b4b-a1d9-fdeea529606d'],
              clusters: ['OpenShift on AWS - Nise Populator', 'OpenShift on GCP - Nise Populator'],
              infrastructure: {
                raw: {
                  value: 148.4749281793297,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 0,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 148.4749281793297,
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
                  value: 2134.23,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 2134.23,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 148.4749281793297,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 2134.23,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 2282.7049281793297,
                  units: 'USD',
                },
              },
            },
          ],
        },
        {
          project: 'snowdown',
          values: [
            {
              date: '2022-06',
              project: 'snowdown',
              source_uuid: ['a99443de-af6d-4b4b-a1d9-fdeea529606d'],
              clusters: ['OpenShift on GCP - Nise Populator'],
              infrastructure: {
                raw: {
                  value: 100.19121620000001,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 0,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 100.19121620000001,
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
                  value: 2130.88,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 2130.88,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 100.19121620000001,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 2130.88,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 2231.0712162,
                  units: 'USD',
                },
              },
            },
          ],
        },
        {
          project: 'kube-system',
          values: [
            {
              date: '2022-06',
              project: 'kube-system',
              source_uuid: [
                '1899fc34-7096-47d6-82d8-e371268530b1',
                '7b2cf7da-d494-4f4d-b640-f9fa57a0fe1c',
                'a99443de-af6d-4b4b-a1d9-fdeea529606d',
                'ae7cd5c5-b6b8-4059-966d-0548287cb609',
              ],
              clusters: [
                'OpenShift on AWS - Nise Populator',
                'OpenShift on Azure - Nise Populator',
                'OpenShift on GCP - Nise Populator',
                'OpenShift on OpenStack - Nise Populator',
              ],
              infrastructure: {
                raw: {
                  value: 61.971718798429,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 1182.9935,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 1244.965218798429,
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
                  value: 1077.26,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 1077.26,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 61.971718798429,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 2260.2535,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 2322.225218798429,
                  units: 'USD',
                },
              },
            },
          ],
        },
        {
          project: 'fall',
          values: [
            {
              date: '2022-06',
              project: 'fall',
              source_uuid: ['a99443de-af6d-4b4b-a1d9-fdeea529606d'],
              clusters: ['OpenShift on GCP - Nise Populator'],
              infrastructure: {
                raw: {
                  value: 100.19121620000001,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 0,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 100.19121620000001,
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
                  value: 2124.07,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 2124.07,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 100.19121620000001,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 2124.07,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 2224.2612162,
                  units: 'USD',
                },
              },
            },
          ],
        },
        {
          project: 'NewDelhi',
          values: [
            {
              date: '2022-06',
              project: 'NewDelhi',
              source_uuid: ['1899fc34-7096-47d6-82d8-e371268530b1'],
              clusters: ['OpenShift on OpenStack - Nise Populator'],
              infrastructure: {
                raw: {
                  value: 0,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 1183.0062777777778,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 1183.0062777777778,
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
                  value: 0,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 0,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 0,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 1183.0062777777778,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 1183.0062777777778,
                  units: 'USD',
                },
              },
            },
          ],
        },
        {
          project: 'Paris',
          values: [
            {
              date: '2022-06',
              project: 'Paris',
              source_uuid: ['1899fc34-7096-47d6-82d8-e371268530b1'],
              clusters: ['OpenShift on OpenStack - Nise Populator'],
              infrastructure: {
                raw: {
                  value: 0,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 1183.0062777777778,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 1183.0062777777778,
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
                  value: 0,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 0,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 0,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 1183.0062777777778,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 1183.0062777777778,
                  units: 'USD',
                },
              },
            },
          ],
        },
        {
          project: 'LosAngeles',
          values: [
            {
              date: '2022-06',
              project: 'LosAngeles',
              source_uuid: ['1899fc34-7096-47d6-82d8-e371268530b1'],
              clusters: ['OpenShift on OpenStack - Nise Populator'],
              infrastructure: {
                raw: {
                  value: 0,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 1183.0062777777778,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 1183.0062777777778,
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
                  value: 0,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 0,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 0,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 1183.0062777777778,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 1183.0062777777778,
                  units: 'USD',
                },
              },
            },
          ],
        },
        {
          project: 'SanFrancisco',
          values: [
            {
              date: '2022-06',
              project: 'SanFrancisco',
              source_uuid: ['1899fc34-7096-47d6-82d8-e371268530b1'],
              clusters: ['OpenShift on OpenStack - Nise Populator'],
              infrastructure: {
                raw: {
                  value: 0,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 1183.0062777777778,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 1183.0062777777778,
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
                  value: 0,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 0,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 0,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 1183.0062777777778,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 1183.0062777777778,
                  units: 'USD',
                },
              },
            },
          ],
        },
      ],
    },
    {
      date: '2022-07',
      projects: [
        {
          project: 'analytics',
          values: [
            {
              date: '2022-07',
              project: 'analytics',
              source_uuid: ['7b2cf7da-d494-4f4d-b640-f9fa57a0fe1c', 'a99443de-af6d-4b4b-a1d9-fdeea529606d'],
              clusters: ['OpenShift on AWS - Nise Populator', 'OpenShift on GCP - Nise Populator'],
              infrastructure: {
                raw: {
                  value: 6014.457048413701,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 0,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 6014.457048413701,
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
                  value: 10448,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 10448,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 6014.457048413701,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 10448,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 16462.4570484137,
                  units: 'USD',
                },
              },
            },
          ],
        },
        {
          project: 'openshift',
          values: [
            {
              date: '2022-07',
              project: 'openshift',
              source_uuid: [
                '1899fc34-7096-47d6-82d8-e371268530b1',
                '7b2cf7da-d494-4f4d-b640-f9fa57a0fe1c',
                'a99443de-af6d-4b4b-a1d9-fdeea529606d',
                'ae7cd5c5-b6b8-4059-966d-0548287cb609',
              ],
              clusters: [
                'OpenShift on AWS - Nise Populator',
                'OpenShift on Azure - Nise Populator',
                'OpenShift on GCP - Nise Populator',
                'OpenShift on OpenStack - Nise Populator',
              ],
              infrastructure: {
                raw: {
                  value: 1329.1420881835122,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 3358.67285,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 4687.814938183512,
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
                  value: 3068.53,
                  units: 'USD',
                },
                distributed: {
                  value: 374.20754778865626,
                  units: 'USD',
                },
                total: {
                  value: 3442.7375477886562,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 1329.1420881835122,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 6427.20285,
                  units: 'USD',
                },
                distributed: {
                  value: 374.20754778865626,
                  units: 'USD',
                },
                total: {
                  value: 8130.552485972168,
                  units: 'USD',
                },
              },
            },
          ],
        },
        {
          project: 'cost-management',
          values: [
            {
              date: '2022-07',
              project: 'cost-management',
              source_uuid: ['7b2cf7da-d494-4f4d-b640-f9fa57a0fe1c', 'a99443de-af6d-4b4b-a1d9-fdeea529606d'],
              clusters: ['OpenShift on AWS - Nise Populator', 'OpenShift on GCP - Nise Populator'],
              infrastructure: {
                raw: {
                  value: 2734.911686451038,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 0,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 2734.911686451038,
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
                  value: 6088.5,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 6088.5,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 2734.911686451038,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 6088.5,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 8823.411686451038,
                  units: 'USD',
                },
              },
            },
          ],
        },
        {
          project: 'snowdown',
          values: [
            {
              date: '2022-07',
              project: 'snowdown',
              source_uuid: ['a99443de-af6d-4b4b-a1d9-fdeea529606d'],
              clusters: ['OpenShift on GCP - Nise Populator'],
              infrastructure: {
                raw: {
                  value: 2583.0403218857145,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 0,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 2583.0403218857145,
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
                  value: 6096.39,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 6096.39,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 2583.0403218857145,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 6096.39,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 8679.430321885715,
                  units: 'USD',
                },
              },
            },
          ],
        },
        {
          project: 'kube-system',
          values: [
            {
              date: '2022-07',
              project: 'kube-system',
              source_uuid: [
                '1899fc34-7096-47d6-82d8-e371268530b1',
                '7b2cf7da-d494-4f4d-b640-f9fa57a0fe1c',
                'a99443de-af6d-4b4b-a1d9-fdeea529606d',
                'ae7cd5c5-b6b8-4059-966d-0548287cb609',
              ],
              clusters: [
                'OpenShift on AWS - Nise Populator',
                'OpenShift on Azure - Nise Populator',
                'OpenShift on GCP - Nise Populator',
                'OpenShift on OpenStack - Nise Populator',
              ],
              infrastructure: {
                raw: {
                  value: 1329.1420881835122,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 3358.67285,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 4687.814938183512,
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
                  value: 3068.02,
                  units: 'USD',
                },
                distributed: {
                  value: 307.53206945248,
                  units: 'USD',
                },
                total: {
                  value: 3375.55206945248,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 1329.1420881835122,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 6426.69285,
                  units: 'USD',
                },
                distributed: {
                  value: 307.53206945248,
                  units: 'USD',
                },
                total: {
                  value: 8063.367007635992,
                  units: 'USD',
                },
              },
            },
          ],
        },
        {
          project: 'fall',
          values: [
            {
              date: '2022-07',
              project: 'fall',
              source_uuid: ['a99443de-af6d-4b4b-a1d9-fdeea529606d'],
              clusters: ['OpenShift on GCP - Nise Populator'],
              infrastructure: {
                raw: {
                  value: 2583.0403218857145,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 0,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 2583.0403218857145,
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
                  value: 6070.15,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 6070.15,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 2583.0403218857145,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 6070.15,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 8653.190321885715,
                  units: 'USD',
                },
              },
            },
          ],
        },
        {
          project: 'NewDelhi',
          values: [
            {
              date: '2022-07',
              project: 'NewDelhi',
              source_uuid: ['1899fc34-7096-47d6-82d8-e371268530b1'],
              clusters: ['OpenShift on OpenStack - Nise Populator'],
              infrastructure: {
                raw: {
                  value: 0,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 3358.706479032258,
                  units: 'USD',
                },
                distributed: {
                  value: 100,
                  units: 'USD',
                },
                total: {
                  value: 3458.706479032258,
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
                  value: 0,
                  units: 'USD',
                },
                distributed: {
                  value: 428.8005094705176,
                  units: 'USD',
                },
                total: {
                  value: 428.8005094705176,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 0,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 3358.706479032258,
                  units: 'USD',
                },
                distributed: {
                  value: 528.8005094705176,
                  units: 'USD',
                },
                total: {
                  value: 3887.5069885027756,
                  units: 'USD',
                },
              },
            },
          ],
        },
        {
          project: 'Paris',
          values: [
            {
              date: '2022-07',
              project: 'Paris',
              source_uuid: ['1899fc34-7096-47d6-82d8-e371268530b1'],
              clusters: ['OpenShift on OpenStack - Nise Populator'],
              infrastructure: {
                raw: {
                  value: 0,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 3358.706479032258,
                  units: 'USD',
                },
                distributed: {
                  value: 100,
                  units: 'USD',
                },
                total: {
                  value: 3458.706479032258,
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
                  value: 0,
                  units: 'USD',
                },
                distributed: {
                  value: 418.204313563932,
                  units: 'USD',
                },
                total: {
                  value: 418.204313563932,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 0,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 3358.706479032258,
                  units: 'USD',
                },
                distributed: {
                  value: 518.204313563932,
                  units: 'USD',
                },
                total: {
                  value: 3876.91079259619,
                  units: 'USD',
                },
              },
            },
          ],
        },
        {
          project: 'LosAngeles',
          values: [
            {
              date: '2022-07',
              project: 'LosAngeles',
              source_uuid: ['1899fc34-7096-47d6-82d8-e371268530b1'],
              clusters: ['OpenShift on OpenStack - Nise Populator'],
              infrastructure: {
                raw: {
                  value: 0,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 3358.706479032258,
                  units: 'USD',
                },
                distributed: {
                  value: 100,
                  units: 'USD',
                },
                total: {
                  value: 3458.706479032258,
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
                  value: 0,
                  units: 'USD',
                },
                distributed: {
                  value: 392.12870817139776,
                  units: 'USD',
                },
                total: {
                  value: 392.12870817139776,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 0,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 3358.706479032258,
                  units: 'USD',
                },
                distributed: {
                  value: 492.12870817139776,
                  units: 'USD',
                },
                total: {
                  value: 3850.835187203656,
                  units: 'USD',
                },
              },
            },
          ],
        },
        {
          project: 'SanFrancisco',
          values: [
            {
              date: '2022-07',
              project: 'SanFrancisco',
              source_uuid: ['1899fc34-7096-47d6-82d8-e371268530b1'],
              clusters: ['OpenShift on OpenStack - Nise Populator'],
              infrastructure: {
                raw: {
                  value: 0,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 3358.706479032258,
                  units: 'USD',
                },
                distributed: {
                  value: 100,
                  units: 'USD',
                },
                total: {
                  value: 3458.706479032258,
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
                  value: 0,
                  units: 'USD',
                },
                distributed: {
                  value: 398.40313180491796,
                  units: 'USD',
                },
                total: {
                  value: 398.40313180491796,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 0,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 3358.706479032258,
                  units: 'USD',
                },
                distributed: {
                  value: 498.40313180491796,
                  units: 'USD',
                },
                total: {
                  value: 3857.109610837176,
                  units: 'USD',
                },
              },
            },
          ],
        },
      ],
    },
    {
      date: '2022-08',
      projects: [
        {
          project: 'analytics',
          values: [
            {
              date: '2022-08',
              project: 'analytics',
              source_uuid: ['7b2cf7da-d494-4f4d-b640-f9fa57a0fe1c', 'a99443de-af6d-4b4b-a1d9-fdeea529606d'],
              clusters: ['OpenShift on AWS - Nise Populator', 'OpenShift on GCP - Nise Populator'],
              infrastructure: {
                raw: {
                  value: 3392.2000140326872,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 0,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 3392.2000140326872,
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
                  value: 7136,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 7136,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 3392.2000140326872,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 7136,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 10528.200014032687,
                  units: 'USD',
                },
              },
            },
          ],
        },
        {
          project: 'openshift',
          values: [
            {
              date: '2022-08',
              project: 'openshift',
              source_uuid: [
                '1899fc34-7096-47d6-82d8-e371268530b1',
                '7b2cf7da-d494-4f4d-b640-f9fa57a0fe1c',
                'a99443de-af6d-4b4b-a1d9-fdeea529606d',
                'ae7cd5c5-b6b8-4059-966d-0548287cb609',
              ],
              clusters: [
                'OpenShift on AWS - Nise Populator',
                'OpenShift on Azure - Nise Populator',
                'OpenShift on GCP - Nise Populator',
                'OpenShift on OpenStack - Nise Populator',
              ],
              infrastructure: {
                raw: {
                  value: 797.1670545550679,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 2293.9787,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 3091.145754555068,
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
                  value: 2064.61,
                  units: 'USD',
                },
                distributed: {
                  value: 394.13103598871703,
                  units: 'USD',
                },
                total: {
                  value: 2458.741035988717,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 797.1670545550679,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 4358.5887,
                  units: 'USD',
                },
                distributed: {
                  value: 394.13103598871703,
                  units: 'USD',
                },
                total: {
                  value: 5549.886790543785,
                  units: 'USD',
                },
              },
            },
          ],
        },
        {
          project: 'cost-management',
          values: [
            {
              date: '2022-08',
              project: 'cost-management',
              source_uuid: ['7b2cf7da-d494-4f4d-b640-f9fa57a0fe1c', 'a99443de-af6d-4b4b-a1d9-fdeea529606d'],
              clusters: ['OpenShift on AWS - Nise Populator', 'OpenShift on GCP - Nise Populator'],
              infrastructure: {
                raw: {
                  value: 1619.181524760065,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 0,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 1619.181524760065,
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
                  value: 4136.77,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 4136.77,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 1619.181524760065,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 4136.77,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 5755.951524760065,
                  units: 'USD',
                },
              },
            },
          ],
        },
        {
          project: 'snowdown',
          values: [
            {
              date: '2022-08',
              project: 'snowdown',
              source_uuid: ['a99443de-af6d-4b4b-a1d9-fdeea529606d'],
              clusters: ['OpenShift on GCP - Nise Populator'],
              infrastructure: {
                raw: {
                  value: 1541.4664760428573,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 0,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 1541.4664760428573,
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
                  value: 4167.37,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 4167.37,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 1541.4664760428573,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 4167.37,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 5708.836476042858,
                  units: 'USD',
                },
              },
            },
          ],
        },
        {
          project: 'kube-system',
          values: [
            {
              date: '2022-08',
              project: 'kube-system',
              source_uuid: [
                '1899fc34-7096-47d6-82d8-e371268530b1',
                '7b2cf7da-d494-4f4d-b640-f9fa57a0fe1c',
                'a99443de-af6d-4b4b-a1d9-fdeea529606d',
                'ae7cd5c5-b6b8-4059-966d-0548287cb609',
              ],
              clusters: [
                'OpenShift on AWS - Nise Populator',
                'OpenShift on Azure - Nise Populator',
                'OpenShift on GCP - Nise Populator',
                'OpenShift on OpenStack - Nise Populator',
              ],
              infrastructure: {
                raw: {
                  value: 797.1670545550679,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 2293.9787,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 3091.145754555068,
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
                  value: 2067,
                  units: 'USD',
                },
                distributed: {
                  value: 393.0167365957963,
                  units: 'USD',
                },
                total: {
                  value: 2460.0167365957964,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 797.1670545550679,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 4360.9787,
                  units: 'USD',
                },
                distributed: {
                  value: 393.0167365957963,
                  units: 'USD',
                },
                total: {
                  value: 5551.162491150864,
                  units: 'USD',
                },
              },
            },
          ],
        },
        {
          project: 'fall',
          values: [
            {
              date: '2022-08',
              project: 'fall',
              source_uuid: ['a99443de-af6d-4b4b-a1d9-fdeea529606d'],
              clusters: ['OpenShift on GCP - Nise Populator'],
              infrastructure: {
                raw: {
                  value: 1541.4664760428573,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 0,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 1541.4664760428573,
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
                  value: 4140.57,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 4140.57,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 1541.4664760428573,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 4140.57,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 5682.036476042857,
                  units: 'USD',
                },
              },
            },
          ],
        },
        {
          project: 'NewDelhi',
          values: [
            {
              date: '2022-08',
              project: 'NewDelhi',
              source_uuid: ['1899fc34-7096-47d6-82d8-e371268530b1'],
              clusters: ['OpenShift on OpenStack - Nise Populator'],
              infrastructure: {
                raw: {
                  value: 0,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 2294.0012,
                  units: 'USD',
                },
                distributed: {
                  value: 100,
                  units: 'USD',
                },
                total: {
                  value: 2394.0012,
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
                  value: 0,
                  units: 'USD',
                },
                distributed: {
                  value: 368.7384975672431,
                  units: 'USD',
                },
                total: {
                  value: 368.7384975672431,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 0,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 2294.0012,
                  units: 'USD',
                },
                distributed: {
                  value: 468.7384975672431,
                  units: 'USD',
                },
                total: {
                  value: 2762.739697567243,
                  units: 'USD',
                },
              },
            },
          ],
        },
        {
          project: 'Paris',
          values: [
            {
              date: '2022-08',
              project: 'Paris',
              source_uuid: ['1899fc34-7096-47d6-82d8-e371268530b1'],
              clusters: ['OpenShift on OpenStack - Nise Populator'],
              infrastructure: {
                raw: {
                  value: 0,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 2294.0012,
                  units: 'USD',
                },
                distributed: {
                  value: 100,
                  units: 'USD',
                },
                total: {
                  value: 2394.0012,
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
                  value: 0,
                  units: 'USD',
                },
                distributed: {
                  value: 398.6606677041817,
                  units: 'USD',
                },
                total: {
                  value: 398.6606677041817,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 0,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 2294.0012,
                  units: 'USD',
                },
                distributed: {
                  value: 498.6606677041817,
                  units: 'USD',
                },
                total: {
                  value: 2792.6618677041815,
                  units: 'USD',
                },
              },
            },
          ],
        },
        {
          project: 'LosAngeles',
          values: [
            {
              date: '2022-08',
              project: 'LosAngeles',
              source_uuid: ['1899fc34-7096-47d6-82d8-e371268530b1'],
              clusters: ['OpenShift on OpenStack - Nise Populator'],
              infrastructure: {
                raw: {
                  value: 0,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 2294.0012,
                  units: 'USD',
                },
                distributed: {
                  value: 100,
                  units: 'USD',
                },
                total: {
                  value: 2394.0012,
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
                  value: 0,
                  units: 'USD',
                },
                distributed: {
                  value: 323.1074847137418,
                  units: 'USD',
                },
                total: {
                  value: 323.1074847137418,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 0,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 2294.0012,
                  units: 'USD',
                },
                distributed: {
                  value: 423.1074847137418,
                  units: 'USD',
                },
                total: {
                  value: 2717.1086847137417,
                  units: 'USD',
                },
              },
            },
          ],
        },
        {
          project: 'SanFrancisco',
          values: [
            {
              date: '2022-08',
              project: 'SanFrancisco',
              source_uuid: ['1899fc34-7096-47d6-82d8-e371268530b1'],
              clusters: ['OpenShift on OpenStack - Nise Populator'],
              infrastructure: {
                raw: {
                  value: 0,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 2294.0012,
                  units: 'USD',
                },
                distributed: {
                  value: 100,
                  units: 'USD',
                },
                total: {
                  value: 2394.0012,
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
                  value: 0,
                  units: 'USD',
                },
                distributed: {
                  value: 397.097713722405,
                  units: 'USD',
                },
                total: {
                  value: 397.097713722405,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 0,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 2294.0012,
                  units: 'USD',
                },
                distributed: {
                  value: 497.097713722405,
                  units: 'USD',
                },
                total: {
                  value: 2791.098913722405,
                  units: 'USD',
                },
              },
            },
          ],
        },
      ],
    },
    {
      date: '2022-09',
      projects: [
        {
          project: 'analytics',
          values: [
            {
              date: '2022-09',
              project: 'analytics',
              source_uuid: ['7b2cf7da-d494-4f4d-b640-f9fa57a0fe1c', 'a99443de-af6d-4b4b-a1d9-fdeea529606d'],
              clusters: ['OpenShift on AWS - Nise Populator', 'OpenShift on GCP - Nise Populator'],
              infrastructure: {
                raw: {
                  value: 1868.0322357636906,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 0,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 1868.0322357636906,
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
                  value: 4928,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 4928,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 1868.0322357636906,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 4928,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 6796.032235763691,
                  units: 'USD',
                },
              },
            },
          ],
        },
        {
          project: 'openshift',
          values: [
            {
              date: '2022-09',
              project: 'openshift',
              source_uuid: [
                '1899fc34-7096-47d6-82d8-e371268530b1',
                '7b2cf7da-d494-4f4d-b640-f9fa57a0fe1c',
                'a99443de-af6d-4b4b-a1d9-fdeea529606d',
                'ae7cd5c5-b6b8-4059-966d-0548287cb609',
              ],
              clusters: [
                'OpenShift on AWS - Nise Populator',
                'OpenShift on Azure - Nise Populator',
                'OpenShift on GCP - Nise Populator',
                'OpenShift on OpenStack - Nise Populator',
              ],
              infrastructure: {
                raw: {
                  value: 1792.722397789989,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 2175.67935,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 3968.401747789989,
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
                  value: 1426.52,
                  units: 'USD',
                },
                distributed: {
                  value: 303.02220048269066,
                  units: 'USD',
                },
                total: {
                  value: 1729.5422004826905,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 1792.722397789989,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 3602.19935,
                  units: 'USD',
                },
                distributed: {
                  value: 303.02220048269066,
                  units: 'USD',
                },
                total: {
                  value: 5697.943948272679,
                  units: 'USD',
                },
              },
            },
          ],
        },
        {
          project: 'cost-management',
          values: [
            {
              date: '2022-09',
              project: 'cost-management',
              source_uuid: ['7b2cf7da-d494-4f4d-b640-f9fa57a0fe1c', 'a99443de-af6d-4b4b-a1d9-fdeea529606d'],
              clusters: ['OpenShift on AWS - Nise Populator', 'OpenShift on GCP - Nise Populator'],
              infrastructure: {
                raw: {
                  value: 867.9352642597763,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 0,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 867.9352642597763,
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
                  value: 2879.35,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 2879.35,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 867.9352642597763,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 2879.35,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 3747.2852642597763,
                  units: 'USD',
                },
              },
            },
          ],
        },
        {
          project: 'snowdown',
          values: [
            {
              date: '2022-09',
              project: 'snowdown',
              source_uuid: ['a99443de-af6d-4b4b-a1d9-fdeea529606d'],
              clusters: ['OpenShift on GCP - Nise Populator'],
              infrastructure: {
                raw: {
                  value: 801.0785402571428,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 0,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 801.0785402571428,
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
                  value: 2892.09,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 2892.09,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 801.0785402571428,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 2892.09,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 3693.168540257143,
                  units: 'USD',
                },
              },
            },
          ],
        },
        {
          project: 'kube-system',
          values: [
            {
              date: '2022-09',
              project: 'kube-system',
              source_uuid: [
                '1899fc34-7096-47d6-82d8-e371268530b1',
                '7b2cf7da-d494-4f4d-b640-f9fa57a0fe1c',
                'a99443de-af6d-4b4b-a1d9-fdeea529606d',
                'ae7cd5c5-b6b8-4059-966d-0548287cb609',
              ],
              clusters: [
                'OpenShift on AWS - Nise Populator',
                'OpenShift on Azure - Nise Populator',
                'OpenShift on GCP - Nise Populator',
                'OpenShift on OpenStack - Nise Populator',
              ],
              infrastructure: {
                raw: {
                  value: 423.2836732320794,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 2175.67935,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 2598.9630232320796,
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
                  value: 1422.25,
                  units: 'USD',
                },
                distributed: {
                  value: 350.79512539674135,
                  units: 'USD',
                },
                total: {
                  value: 1773.0451253967415,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 423.2836732320794,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 3597.92935,
                  units: 'USD',
                },
                distributed: {
                  value: 350.79512539674135,
                  units: 'USD',
                },
                total: {
                  value: 4372.008148628821,
                  units: 'USD',
                },
              },
            },
          ],
        },
        {
          project: 'fall',
          values: [
            {
              date: '2022-09',
              project: 'fall',
              source_uuid: ['a99443de-af6d-4b4b-a1d9-fdeea529606d'],
              clusters: ['OpenShift on GCP - Nise Populator'],
              infrastructure: {
                raw: {
                  value: 801.0785402571428,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 0,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 801.0785402571428,
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
                  value: 2873.32,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 2873.32,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 801.0785402571428,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 2873.32,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 3674.398540257143,
                  units: 'USD',
                },
              },
            },
          ],
        },
        {
          project: 'NewDelhi',
          values: [
            {
              date: '2022-09',
              project: 'NewDelhi',
              source_uuid: ['1899fc34-7096-47d6-82d8-e371268530b1'],
              clusters: ['OpenShift on OpenStack - Nise Populator'],
              infrastructure: {
                raw: {
                  value: 0,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 2175.7026,
                  units: 'USD',
                },
                distributed: {
                  value: 100,
                  units: 'USD',
                },
                total: {
                  value: 2275.7026,
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
                  value: 0,
                  units: 'USD',
                },
                distributed: {
                  value: 373.3557704767832,
                  units: 'USD',
                },
                total: {
                  value: 373.3557704767832,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 0,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 2175.7026,
                  units: 'USD',
                },
                distributed: {
                  value: 473.3557704767832,
                  units: 'USD',
                },
                total: {
                  value: 2649.0583704767832,
                  units: 'USD',
                },
              },
            },
          ],
        },
        {
          project: 'Paris',
          values: [
            {
              date: '2022-09',
              project: 'Paris',
              source_uuid: ['1899fc34-7096-47d6-82d8-e371268530b1'],
              clusters: ['OpenShift on OpenStack - Nise Populator'],
              infrastructure: {
                raw: {
                  value: 0,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 2175.7026,
                  units: 'USD',
                },
                distributed: {
                  value: 100,
                  units: 'USD',
                },
                total: {
                  value: 2275.7026,
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
                  value: 0,
                  units: 'USD',
                },
                distributed: {
                  value: 326.2563248956776,
                  units: 'USD',
                },
                total: {
                  value: 326.2563248956776,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 0,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 2175.7026,
                  units: 'USD',
                },
                distributed: {
                  value: 426.2563248956776,
                  units: 'USD',
                },
                total: {
                  value: 2601.9589248956777,
                  units: 'USD',
                },
              },
            },
          ],
        },
        {
          project: 'LosAngeles',
          values: [
            {
              date: '2022-09',
              project: 'LosAngeles',
              source_uuid: ['1899fc34-7096-47d6-82d8-e371268530b1'],
              clusters: ['OpenShift on OpenStack - Nise Populator'],
              infrastructure: {
                raw: {
                  value: 0,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 2175.7026,
                  units: 'USD',
                },
                distributed: {
                  value: 100,
                  units: 'USD',
                },
                total: {
                  value: 2275.7026,
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
                  value: 0,
                  units: 'USD',
                },
                distributed: {
                  value: 427.5766364118092,
                  units: 'USD',
                },
                total: {
                  value: 427.5766364118092,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 0,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 2175.7026,
                  units: 'USD',
                },
                distributed: {
                  value: 527.5766364118092,
                  units: 'USD',
                },
                total: {
                  value: 2703.279236411809,
                  units: 'USD',
                },
              },
            },
          ],
        },
        {
          project: 'SanFrancisco',
          values: [
            {
              date: '2022-09',
              project: 'SanFrancisco',
              source_uuid: ['1899fc34-7096-47d6-82d8-e371268530b1'],
              clusters: ['OpenShift on OpenStack - Nise Populator'],
              infrastructure: {
                raw: {
                  value: 0,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 2175.7026,
                  units: 'USD',
                },
                distributed: {
                  value: 100,
                  units: 'USD',
                },
                total: {
                  value: 2275.7026,
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
                  value: 0,
                  units: 'USD',
                },
                distributed: {
                  value: 346.15042985259504,
                  units: 'USD',
                },
                total: {
                  value: 346.15042985259504,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 0,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 2175.7026,
                  units: 'USD',
                },
                distributed: {
                  value: 446.15042985259504,
                  units: 'USD',
                },
                total: {
                  value: 2621.8530298525952,
                  units: 'USD',
                },
              },
            },
          ],
        },
      ],
    },
  ],
};
