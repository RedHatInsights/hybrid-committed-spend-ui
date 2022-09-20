// https://console.stage.redhat.com/api/cost-management/v1/reports/openshift/costs/?filter[limit]=10&filter[offset]=0&group_by[project]=*&start_date=2021-06-21&end_date=2021-09-19&filter[resolution]=monthly

export const previousDataReport = {
  meta: {
    count: 25,
    others: 15,
    start_date: '2021-06-21',
    end_date: '2021-09-19',
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
          value: 30361.72126798656,
          units: 'USD',
        },
        markup: {
          value: 0,
          units: 'USD',
        },
        usage: {
          value: 86159.64748172043,
          units: 'USD',
        },
        distributed: {
          value: 3400,
          units: 'USD',
        },
        total: {
          value: 124121.36874970698,
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
          value: 80168.27,
          units: 'USD',
        },
      },
      cost: {
        raw: {
          value: 30361.72126798656,
          units: 'USD',
        },
        markup: {
          value: 0,
          units: 'USD',
        },
        usage: {
          value: 173327.91748172042,
          units: 'USD',
        },
        distributed: {
          value: 14600,
          units: 'USD',
        },
        total: {
          value: 226289.63874970697,
          units: 'USD',
        },
      },
    },
  },
  links: {
    first:
      '/api/cost-management/v1/reports/openshift/costs/?end_date=2021-09-19&filter%5Blimit%5D=10&filter%5Boffset%5D=0&filter%5Bresolution%5D=monthly&group_by%5Bproject%5D=%2A&start_date=2021-06-21',
    next: '/api/cost-management/v1/reports/openshift/costs/?end_date=2021-09-19&filter%5Blimit%5D=10&filter%5Boffset%5D=10&filter%5Bresolution%5D=monthly&group_by%5Bproject%5D=%2A&start_date=2021-06-21',
    previous: null,
    last: '/api/cost-management/v1/reports/openshift/costs/?end_date=2021-09-19&filter%5Blimit%5D=10&filter%5Boffset%5D=15&filter%5Bresolution%5D=monthly&group_by%5Bproject%5D=%2A&start_date=2021-06-21',
  },
  data: [
    {
      date: '2021-06',
      projects: [
        {
          project: 'analytics',
          values: [
            {
              date: '2021-06',
              project: 'analytics',
              source_uuid: ['7b2cf7da-d494-4f4d-b640-f9fa57a0fe1c', 'a99443de-af6d-4b4b-a1d9-fdeea529606d'],
              clusters: ['OpenShift on AWS - Nise Populator', 'OpenShift on GCP - Nise Populator'],
              infrastructure: {
                raw: {
                  value: 203.85296603862423,
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
                  value: 203.85296603862423,
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
                  value: 1480,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 1480,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 203.85296603862423,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 1480,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 1903.852966038624,
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
              date: '2021-06',
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
                  value: 39.971718798429,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 862.9935,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 844.965218798429,
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
                  value: 828.39,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 828.39,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 39.971718798429,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 1831.3835,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 1893.355218798429,
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
              date: '2021-06',
              project: 'cost-management',
              source_uuid: ['7b2cf7da-d494-4f4d-b640-f9fa57a0fe1c', 'a99443de-af6d-4b4b-a1d9-fdeea529606d'],
              clusters: ['OpenShift on AWS - Nise Populator', 'OpenShift on GCP - Nise Populator'],
              infrastructure: {
                raw: {
                  value: 46.4749281793297,
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
                  value: 46.4749281793297,
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
                  value: 1734.23,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 1734.23,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 108.4749281793297,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 1734.23,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 1882.7049281793297,
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
              date: '2021-06',
              project: 'snowdown',
              source_uuid: ['a99443de-af6d-4b4b-a1d9-fdeea529606d'],
              clusters: ['OpenShift on GCP - Nise Populator'],
              infrastructure: {
                raw: {
                  value: 78.19121620000001,
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
                  value: 78.19121620000001,
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
                  value: 1730.88,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 1730.88,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 78.19121620000001,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 1730.88,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 1831.0712162,
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
              date: '2021-06',
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
                  value: 41.971718798429,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 982.9935,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 1044.965218798429,
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
                  value: 877.26,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 877.26,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 41.971718798429,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 2060.2535,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 2122.225218798429,
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
              date: '2021-06',
              project: 'fall',
              source_uuid: ['a99443de-af6d-4b4b-a1d9-fdeea529606d'],
              clusters: ['OpenShift on GCP - Nise Populator'],
              infrastructure: {
                raw: {
                  value: 80.19121620000001,
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
                  value: 80.19121620000001,
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
                  value: 1924.07,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 1924.07,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 80.19121620000001,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 1924.07,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 2024.2612162,
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
              date: '2021-06',
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
                  value: 983.0062777777778,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 983.0062777777778,
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
                  value: 983.0062777777778,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 983.0062777777778,
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
              date: '2021-06',
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
                  value: 983.0062777777778,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 983.0062777777778,
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
                  value: 983.0062777777778,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 983.0062777777778,
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
              date: '2021-06',
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
                  value: 983.0062777777778,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 983.0062777777778,
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
                  value: 983.0062777777778,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 983.0062777777778,
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
              date: '2021-06',
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
                  value: 983.0062777777778,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 983.0062777777778,
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
                  value: 983.0062777777778,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 983.0062777777778,
                  units: 'USD',
                },
              },
            },
          ],
        },
      ],
    },
    {
      date: '2021-07',
      projects: [
        {
          project: 'analytics',
          values: [
            {
              date: '2021-07',
              project: 'analytics',
              source_uuid: ['7b2cf7da-d494-4f4d-b640-f9fa57a0fe1c', 'a99443de-af6d-4b4b-a1d9-fdeea529606d'],
              clusters: ['OpenShift on AWS - Nise Populator', 'OpenShift on GCP - Nise Populator'],
              infrastructure: {
                raw: {
                  value: 5814.457048413701,
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
                  value: 5814.457048413701,
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
                  value: 8448,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 8448,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 5814.457048413701,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 8448,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 14462.4570484137,
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
              date: '2021-07',
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
                  value: 1229.1420881835122,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 3258.67285,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 4487.814938183512,
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
                  value: 2868.53,
                  units: 'USD',
                },
                distributed: {
                  value: 354.20754778865626,
                  units: 'USD',
                },
                total: {
                  value: 3242.7375477886562,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 1229.1420881835122,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 6227.20285,
                  units: 'USD',
                },
                distributed: {
                  value: 354.20754778865626,
                  units: 'USD',
                },
                total: {
                  value: 7930.552485972168,
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
              date: '2021-07',
              project: 'cost-management',
              source_uuid: ['7b2cf7da-d494-4f4d-b640-f9fa57a0fe1c', 'a99443de-af6d-4b4b-a1d9-fdeea529606d'],
              clusters: ['OpenShift on AWS - Nise Populator', 'OpenShift on GCP - Nise Populator'],
              infrastructure: {
                raw: {
                  value: 2534.911686451038,
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
                  value: 2534.911686451038,
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
                  value: 5888.5,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 5888.5,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 2534.911686451038,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 5888.5,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 8623.411686451038,
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
              date: '2021-07',
              project: 'snowdown',
              source_uuid: ['a99443de-af6d-4b4b-a1d9-fdeea529606d'],
              clusters: ['OpenShift on GCP - Nise Populator'],
              infrastructure: {
                raw: {
                  value: 2383.0403218857145,
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
                  value: 2383.0403218857145,
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
                  value: 5896.39,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 5896.39,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 2383.0403218857145,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 5896.39,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 8479.430321885715,
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
              date: '2021-07',
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
                  value: 1229.1420881835122,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 3258.67285,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 4487.814938183512,
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
                  value: 2868.02,
                  units: 'USD',
                },
                distributed: {
                  value: 287.53206945248,
                  units: 'USD',
                },
                total: {
                  value: 3275.55206945248,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 1229.1420881835122,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 6226.69285,
                  units: 'USD',
                },
                distributed: {
                  value: 287.53206945248,
                  units: 'USD',
                },
                total: {
                  value: 7863.367007635992,
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
              date: '2021-07',
              project: 'fall',
              source_uuid: ['a99443de-af6d-4b4b-a1d9-fdeea529606d'],
              clusters: ['OpenShift on GCP - Nise Populator'],
              infrastructure: {
                raw: {
                  value: 2383.0403218857145,
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
                  value: 2383.0403218857145,
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
                  value: 5870.15,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 5870.15,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 2383.0403218857145,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 5870.15,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 8453.190321885715,
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
              date: '2021-07',
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
                  value: 3258.706479032258,
                  units: 'USD',
                },
                distributed: {
                  value: 80,
                  units: 'USD',
                },
                total: {
                  value: 3258.706479032258,
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
                  value: 408.8005094705176,
                  units: 'USD',
                },
                total: {
                  value: 408.8005094705176,
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
                  value: 3258.706479032258,
                  units: 'USD',
                },
                distributed: {
                  value: 508.8005094705176,
                  units: 'USD',
                },
                total: {
                  value: 3687.5069885027756,
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
              date: '2021-07',
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
                  value: 3258.706479032258,
                  units: 'USD',
                },
                distributed: {
                  value: 80,
                  units: 'USD',
                },
                total: {
                  value: 3258.706479032258,
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
                  value: 398.204313563932,
                  units: 'USD',
                },
                total: {
                  value: 398.204313563932,
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
                  value: 3258.706479032258,
                  units: 'USD',
                },
                distributed: {
                  value: 498.204313563932,
                  units: 'USD',
                },
                total: {
                  value: 3676.91079259619,
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
              date: '2021-07',
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
                  value: 3258.706479032258,
                  units: 'USD',
                },
                distributed: {
                  value: 80,
                  units: 'USD',
                },
                total: {
                  value: 3258.706479032258,
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
                  value: 372.12870817139776,
                  units: 'USD',
                },
                total: {
                  value: 372.12870817139776,
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
                  value: 3258.706479032258,
                  units: 'USD',
                },
                distributed: {
                  value: 472.12870817139776,
                  units: 'USD',
                },
                total: {
                  value: 3650.835187203656,
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
              date: '2021-07',
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
                  value: 3258.706479032258,
                  units: 'USD',
                },
                distributed: {
                  value: 80,
                  units: 'USD',
                },
                total: {
                  value: 3258.706479032258,
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
                  value: 378.40313180491796,
                  units: 'USD',
                },
                total: {
                  value: 378.40313180491796,
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
                  value: 3258.706479032258,
                  units: 'USD',
                },
                distributed: {
                  value: 478.40313180491796,
                  units: 'USD',
                },
                total: {
                  value: 3657.109610837176,
                  units: 'USD',
                },
              },
            },
          ],
        },
      ],
    },
    {
      date: '2021-08',
      projects: [
        {
          project: 'analytics',
          values: [
            {
              date: '2021-08',
              project: 'analytics',
              source_uuid: ['7b2cf7da-d494-4f4d-b640-f9fa57a0fe1c', 'a99443de-af6d-4b4b-a1d9-fdeea529606d'],
              clusters: ['OpenShift on AWS - Nise Populator', 'OpenShift on GCP - Nise Populator'],
              infrastructure: {
                raw: {
                  value: 3292.2000140326872,
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
                  value: 3292.2000140326872,
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
                  value: 6936,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 6936,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 3292.2000140326872,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 6936,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 8528.200014032687,
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
              date: '2021-08',
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
                  value: 777.1670545550679,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 2093.9787,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 2891.145754555068,
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
                  value: 1864.61,
                  units: 'USD',
                },
                distributed: {
                  value: 374.13103598871703,
                  units: 'USD',
                },
                total: {
                  value: 2258.741035988717,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 777.1670545550679,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 4158.5887,
                  units: 'USD',
                },
                distributed: {
                  value: 374.13103598871703,
                  units: 'USD',
                },
                total: {
                  value: 5349.886790543785,
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
              date: '2021-08',
              project: 'cost-management',
              source_uuid: ['7b2cf7da-d494-4f4d-b640-f9fa57a0fe1c', 'a99443de-af6d-4b4b-a1d9-fdeea529606d'],
              clusters: ['OpenShift on AWS - Nise Populator', 'OpenShift on GCP - Nise Populator'],
              infrastructure: {
                raw: {
                  value: 1419.181524760065,
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
                  value: 1419.181524760065,
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
                  value: 3936.77,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 3936.77,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 1419.181524760065,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 3936.77,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 5555.951524760065,
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
              date: '2021-08',
              project: 'snowdown',
              source_uuid: ['a99443de-af6d-4b4b-a1d9-fdeea529606d'],
              clusters: ['OpenShift on GCP - Nise Populator'],
              infrastructure: {
                raw: {
                  value: 1341.4664760428573,
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
                  value: 1341.4664760428573,
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
                  value: 3967.37,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 3967.37,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 1341.4664760428573,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 3967.37,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 5508.836476042858,
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
              date: '2021-08',
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
                  value: 777.1670545550679,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 2093.9787,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 2891.145754555068,
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
                  value: 1867,
                  units: 'USD',
                },
                distributed: {
                  value: 373.0167365957963,
                  units: 'USD',
                },
                total: {
                  value: 2260.0167365957964,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 777.1670545550679,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 2360.9787,
                  units: 'USD',
                },
                distributed: {
                  value: 373.0167365957963,
                  units: 'USD',
                },
                total: {
                  value: 5351.162491150864,
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
              date: '2021-08',
              project: 'fall',
              source_uuid: ['a99443de-af6d-4b4b-a1d9-fdeea529606d'],
              clusters: ['OpenShift on GCP - Nise Populator'],
              infrastructure: {
                raw: {
                  value: 1341.4664760428573,
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
                  value: 1341.4664760428573,
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
                  value: 3940.57,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 3940.57,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 1341.4664760428573,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 3940.57,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 5482.036476042857,
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
              date: '2021-08',
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
                  value: 2094.0012,
                  units: 'USD',
                },
                distributed: {
                  value: 80,
                  units: 'USD',
                },
                total: {
                  value: 2194.0012,
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
                  value: 348.7384975672431,
                  units: 'USD',
                },
                total: {
                  value: 348.7384975672431,
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
                  value: 2094.0012,
                  units: 'USD',
                },
                distributed: {
                  value: 448.7384975672431,
                  units: 'USD',
                },
                total: {
                  value: 2562.739697567243,
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
              date: '2021-08',
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
                  value: 2094.0012,
                  units: 'USD',
                },
                distributed: {
                  value: 80,
                  units: 'USD',
                },
                total: {
                  value: 2194.0012,
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
                  value: 378.6606677041817,
                  units: 'USD',
                },
                total: {
                  value: 378.6606677041817,
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
                  value: 2094.0012,
                  units: 'USD',
                },
                distributed: {
                  value: 478.6606677041817,
                  units: 'USD',
                },
                total: {
                  value: 2592.6618677041815,
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
              date: '2021-08',
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
                  value: 2094.0012,
                  units: 'USD',
                },
                distributed: {
                  value: 80,
                  units: 'USD',
                },
                total: {
                  value: 2194.0012,
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
                  value: 303.1074847137418,
                  units: 'USD',
                },
                total: {
                  value: 303.1074847137418,
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
                  value: 2094.0012,
                  units: 'USD',
                },
                distributed: {
                  value: 403.1074847137418,
                  units: 'USD',
                },
                total: {
                  value: 2517.1086847137417,
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
              date: '2021-08',
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
                  value: 2094.0012,
                  units: 'USD',
                },
                distributed: {
                  value: 80,
                  units: 'USD',
                },
                total: {
                  value: 2194.0012,
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
                  value: 377.097713722405,
                  units: 'USD',
                },
                total: {
                  value: 377.097713722405,
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
                  value: 2094.0012,
                  units: 'USD',
                },
                distributed: {
                  value: 477.097713722405,
                  units: 'USD',
                },
                total: {
                  value: 2591.098913722405,
                  units: 'USD',
                },
              },
            },
          ],
        },
      ],
    },
    {
      date: '2021-09',
      projects: [
        {
          project: 'analytics',
          values: [
            {
              date: '2021-09',
              project: 'analytics',
              source_uuid: ['7b2cf7da-d494-4f4d-b640-f9fa57a0fe1c', 'a99443de-af6d-4b4b-a1d9-fdeea529606d'],
              clusters: ['OpenShift on AWS - Nise Populator', 'OpenShift on GCP - Nise Populator'],
              infrastructure: {
                raw: {
                  value: 1668.0322357636906,
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
                  value: 1668.0322357636906,
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
                  value: 4728,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 4728,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 1668.0322357636906,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 4728,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 6596.032235763691,
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
              date: '2021-09',
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
                  value: 1592.722397789989,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 1975.67935,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 3768.401747789989,
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
                  value: 1226.52,
                  units: 'USD',
                },
                distributed: {
                  value: 283.02220048269066,
                  units: 'USD',
                },
                total: {
                  value: 1529.5422004826905,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 1592.722397789989,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 3402.19935,
                  units: 'USD',
                },
                distributed: {
                  value: 283.02220048269066,
                  units: 'USD',
                },
                total: {
                  value: 5497.943948272679,
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
              date: '2021-09',
              project: 'cost-management',
              source_uuid: ['7b2cf7da-d494-4f4d-b640-f9fa57a0fe1c', 'a99443de-af6d-4b4b-a1d9-fdeea529606d'],
              clusters: ['OpenShift on AWS - Nise Populator', 'OpenShift on GCP - Nise Populator'],
              infrastructure: {
                raw: {
                  value: 847.9352642597763,
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
                  value: 847.9352642597763,
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
                  value: 2679.35,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 2679.35,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 847.9352642597763,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 2679.35,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 3547.2852642597763,
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
              date: '2021-09',
              project: 'snowdown',
              source_uuid: ['a99443de-af6d-4b4b-a1d9-fdeea529606d'],
              clusters: ['OpenShift on GCP - Nise Populator'],
              infrastructure: {
                raw: {
                  value: 781.0785402571428,
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
                  value: 781.0785402571428,
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
                  value: 2692.09,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 2692.09,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 781.0785402571428,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 2692.09,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 3493.168540257143,
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
              date: '2021-09',
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
                  value: 403.2836732320794,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 1975.67935,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 2398.9630232320796,
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
                  value: 1222.25,
                  units: 'USD',
                },
                distributed: {
                  value: 330.79512539674135,
                  units: 'USD',
                },
                total: {
                  value: 1573.0451253967415,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 403.2836732320794,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 3397.92935,
                  units: 'USD',
                },
                distributed: {
                  value: 330.79512539674135,
                  units: 'USD',
                },
                total: {
                  value: 4172.008148628821,
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
              date: '2021-09',
              project: 'fall',
              source_uuid: ['a99443de-af6d-4b4b-a1d9-fdeea529606d'],
              clusters: ['OpenShift on GCP - Nise Populator'],
              infrastructure: {
                raw: {
                  value: 781.0785402571428,
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
                  value: 781.0785402571428,
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
                  value: 2673.32,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 2673.32,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 781.0785402571428,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 2673.32,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 3474.398540257143,
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
              date: '2021-09',
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
                  value: 1975.7026,
                  units: 'USD',
                },
                distributed: {
                  value: 80,
                  units: 'USD',
                },
                total: {
                  value: 2075.7026,
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
                  value: 353.3557704767832,
                  units: 'USD',
                },
                total: {
                  value: 353.3557704767832,
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
                  value: 1975.7026,
                  units: 'USD',
                },
                distributed: {
                  value: 453.3557704767832,
                  units: 'USD',
                },
                total: {
                  value: 2449.0583704767832,
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
              date: '2021-09',
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
                  value: 1975.7026,
                  units: 'USD',
                },
                distributed: {
                  value: 80,
                  units: 'USD',
                },
                total: {
                  value: 2075.7026,
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
                  value: 306.2563248956776,
                  units: 'USD',
                },
                total: {
                  value: 306.2563248956776,
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
                  value: 1975.7026,
                  units: 'USD',
                },
                distributed: {
                  value: 406.2563248956776,
                  units: 'USD',
                },
                total: {
                  value: 2401.9589248956777,
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
              date: '2021-09',
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
                  value: 1975.7026,
                  units: 'USD',
                },
                distributed: {
                  value: 80,
                  units: 'USD',
                },
                total: {
                  value: 2075.7026,
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
                  value: 407.5766364118092,
                  units: 'USD',
                },
                total: {
                  value: 407.5766364118092,
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
                  value: 1975.7026,
                  units: 'USD',
                },
                distributed: {
                  value: 507.5766364118092,
                  units: 'USD',
                },
                total: {
                  value: 2503.279236411809,
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
              date: '2021-09',
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
                  value: 1975.7026,
                  units: 'USD',
                },
                distributed: {
                  value: 80,
                  units: 'USD',
                },
                total: {
                  value: 2075.7026,
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
                  value: 326.15042985259504,
                  units: 'USD',
                },
                total: {
                  value: 326.15042985259504,
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
                  value: 1975.7026,
                  units: 'USD',
                },
                distributed: {
                  value: 426.15042985259504,
                  units: 'USD',
                },
                total: {
                  value: 2421.8530298525952,
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
