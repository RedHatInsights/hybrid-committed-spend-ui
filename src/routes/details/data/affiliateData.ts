/* eslint-disable @typescript-eslint/no-loss-of-precision */

// https://console.stage.redhat.com/api/cost-management/v1/reports/openshift/costs/?filter[limit]=3&group_by[affiliate]=*&start_date=2022-06-23&end_date=2022-09-21&filter[resolution]=monthly

export const affiliateData = {
  meta: {
    count: 3,
    start_date: '2022-06-23',
    end_date: '2022-09-21',
    filter: {
      resolution: 'monthly',
      limit: 3,
    },
    group_by: {
      affiliate: ['*'],
    },
    order_by: {},
    total: {
      infrastructure: {
        raw: {
          value: 133658.682170681524,
          units: 'USD',
        },
        markup: {
          value: 0,
          units: 'USD',
        },
        usage: {
          value: 1126159.64748172043,
          units: 'USD',
        },
        distributed: {
          value: 13600,
          units: 'USD',
        },
        total: {
          value: 1163418.32965240197,
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
          value: 187187.64,
          units: 'USD',
        },
        distributed: {
          value: 115000,
          units: 'USD',
        },
        total: {
          value: 1102187.64,
          units: 'USD',
        },
      },
      cost: {
        raw: {
          value: 133658.682170681524,
          units: 'USD',
        },
        markup: {
          value: 0,
          units: 'USD',
        },
        usage: {
          value: 1213347.28748172044,
          units: 'USD',
        },
        distributed: {
          value: 118600,
          units: 'USD',
        },
        total: {
          value: 1265605.969652402,
          units: 'USD',
        },
      },
    },
  },
  links: {
    first:
      '/api/cost-management/v1/reports/openshift/costs/?end_date=2022-09-21&filter%5Blimit%5D=3&filter%5Bresolution%5D=monthly&group_by%5Baffiliate%5D=%2A&limit=100&offset=0&start_date=2022-06-23',
    next: null,
    previous: null,
    last: '/api/cost-management/v1/reports/openshift/costs/?end_date=2022-09-21&filter%5Blimit%5D=3&filter%5Bresolution%5D=monthly&group_by%5Baffiliate%5D=%2A&limit=100&offset=0&start_date=2022-06-23',
  },
  data: [
    {
      date: '2021-10',
      affiliates: [
        {
          affiliate: 'ACME - Anvils',
          values: [
            {
              date: '2021-10',
              affiliate: 'ACME - Anvils',
              source_uuid: ['7b2cf7da-d494-4f4d-b640-f9fa57a0fe1c', 'a99443de-af6d-4b4b-a1d9-fdeea529606d'],
              clusters: ['OpenShift on AWS - Nise Populator', 'OpenShift on GCP - Nise Populator'],
              infrastructure: {
                raw: {
                  value: 11896.9065085362465,
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
                  value: 11896.9065085362465,
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
                  value: 15664,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 15664,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 11896.9065085362465,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 15664,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 17560.906508536246,
                  units: 'USD',
                },
              },
            },
          ],
        },
        {
          affiliate: 'ACME - Fireworks',
          values: [
            {
              date: '2021-10',
              affiliate: 'ACME - Fireworks',
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
                  value: 11228.540293096156,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 12412.27805,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 13640.818343096156,
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
                  value: 11645.5,
                  units: 'USD',
                },
                distributed: {
                  value: 1303.02220048269066,
                  units: 'USD',
                },
                total: {
                  value: 11948.5222004826906,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 11228.540293096156,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 14057.77805,
                  units: 'USD',
                },
                distributed: {
                  value: 1303.02220048269066,
                  units: 'USD',
                },
                total: {
                  value: 15589.340543578846,
                  units: 'USD',
                },
              },
            },
          ],
        },
        {
          affiliate: 'ACME - Tunnels',
          values: [
            {
              date: '2021-10',
              affiliate: 'ACME - Tunnels',
              source_uuid: ['7b2cf7da-d494-4f4d-b640-f9fa57a0fe1c', 'a99443de-af6d-4b4b-a1d9-fdeea529606d'],
              clusters: ['OpenShift on AWS - Nise Populator', 'OpenShift on GCP - Nise Populator'],
              infrastructure: {
                raw: {
                  value: 1875.1810565474063,
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
                  value: 1875.1810565474063,
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
                  value: 13302.79,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 13302.79,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 1875.1810565474063,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 13302.79,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 14177.971056547406,
                  units: 'USD',
                },
              },
            },
          ],
        },
      ],
    },
    {
      date: '2021-11',
      affiliates: [
        {
          affiliate: 'ACME - Anvils',
          values: [
            {
              date: '2021-11',
              affiliate: 'ACME - Anvils',
              source_uuid: ['7b2cf7da-d494-4f4d-b640-f9fa57a0fe1c', 'a99443de-af6d-4b4b-a1d9-fdeea529606d'],
              clusters: ['OpenShift on AWS - Nise Populator', 'OpenShift on GCP - Nise Populator'],
              infrastructure: {
                raw: {
                  value: 13392.2000140326872,
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
                  value: 13392.2000140326872,
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
                  value: 17136,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 17136,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 13392.2000140326872,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 17136,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 110528.200014032687,
                  units: 'USD',
                },
              },
            },
          ],
        },
        {
          affiliate: 'ACME - Fireworks',
          values: [
            {
              date: '2021-11',
              affiliate: 'ACME - Fireworks',
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
                  value: 1797.1670545550679,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 12293.9787,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 13091.145754555068,
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
                  value: 12064.61,
                  units: 'USD',
                },
                distributed: {
                  value: 1394.13103598871703,
                  units: 'USD',
                },
                total: {
                  value: 12458.741035988717,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 1797.1670545550679,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 14358.5887,
                  units: 'USD',
                },
                distributed: {
                  value: 1394.13103598871703,
                  units: 'USD',
                },
                total: {
                  value: 15549.886790543785,
                  units: 'USD',
                },
              },
            },
          ],
        },
        {
          affiliate: 'ACME - Tunnels',
          values: [
            {
              date: '2021-11',
              affiliate: 'ACME - Tunnels',
              source_uuid: ['7b2cf7da-d494-4f4d-b640-f9fa57a0fe1c', 'a99443de-af6d-4b4b-a1d9-fdeea529606d'],
              clusters: ['OpenShift on AWS - Nise Populator', 'OpenShift on GCP - Nise Populator'],
              infrastructure: {
                raw: {
                  value: 11619.181524760065,
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
                  value: 11619.181524760065,
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
                  value: 14136.77,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 14136.77,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 11619.181524760065,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 14136.77,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 15755.951524760065,
                  units: 'USD',
                },
              },
            },
          ],
        },
      ],
    },
    {
      date: '2021-12',
      affiliates: [
        {
          affiliate: 'ACME - Anvils',
          values: [
            {
              date: '2021-12',
              affiliate: 'ACME - Anvils',
              source_uuid: ['7b2cf7da-d494-4f4d-b640-f9fa57a0fe1c', 'a99443de-af6d-4b4b-a1d9-fdeea529606d'],
              clusters: ['OpenShift on AWS - Nise Populator', 'OpenShift on GCP - Nise Populator'],
              infrastructure: {
                raw: {
                  value: 16014.457048413701,
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
                  value: 16014.457048413701,
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
                  value: 110448,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 110448,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 16014.457048413701,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 110448,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 116462.4570484137,
                  units: 'USD',
                },
              },
            },
          ],
        },
        {
          affiliate: 'ACME - Fireworks',
          values: [
            {
              date: '2021-12',
              affiliate: 'ACME - Fireworks',
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
                  value: 11329.1420881835122,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 13358.67285,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 14687.814938183512,
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
                  value: 13068.53,
                  units: 'USD',
                },
                distributed: {
                  value: 1374.20754778865626,
                  units: 'USD',
                },
                total: {
                  value: 13442.7375477886562,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 11329.1420881835122,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 16427.20285,
                  units: 'USD',
                },
                distributed: {
                  value: 1374.20754778865626,
                  units: 'USD',
                },
                total: {
                  value: 18130.552485972168,
                  units: 'USD',
                },
              },
            },
          ],
        },
        {
          affiliate: 'ACME - Tunnels',
          values: [
            {
              date: '2021-12',
              affiliate: 'ACME - Tunnels',
              source_uuid: ['7b2cf7da-d494-4f4d-b640-f9fa57a0fe1c', 'a99443de-af6d-4b4b-a1d9-fdeea529606d'],
              clusters: ['OpenShift on AWS - Nise Populator', 'OpenShift on GCP - Nise Populator'],
              infrastructure: {
                raw: {
                  value: 12734.911686451038,
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
                  value: 12734.911686451038,
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
                  value: 16088.5,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 16088.5,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 12734.911686451038,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 16088.5,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 18823.411686451038,
                  units: 'USD',
                },
              },
            },
          ],
        },
      ],
    },
    {
      date: '2022-01',
      affiliates: [
        {
          affiliate: 'ACME - Anvils',
          values: [
            {
              date: '2022-01',
              affiliate: 'ACME - Anvils',
              source_uuid: ['7b2cf7da-d494-4f4d-b640-f9fa57a0fe1c', 'a99443de-af6d-4b4b-a1d9-fdeea529606d'],
              clusters: ['OpenShift on AWS - Nise Populator', 'OpenShift on GCP - Nise Populator'],
              infrastructure: {
                raw: {
                  value: 16014.457048413701,
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
                  value: 16014.457048413701,
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
                  value: 110448,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 110448,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 16014.457048413701,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 110448,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 116462.4570484137,
                  units: 'USD',
                },
              },
            },
          ],
        },
        {
          affiliate: 'ACME - Fireworks',
          values: [
            {
              date: '2022-01',
              affiliate: 'ACME - Fireworks',
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
                  value: 11329.1420881835122,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 13358.67285,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 14687.814938183512,
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
                  value: 13068.53,
                  units: 'USD',
                },
                distributed: {
                  value: 1374.20754778865626,
                  units: 'USD',
                },
                total: {
                  value: 13442.7375477886562,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 11329.1420881835122,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 16427.20285,
                  units: 'USD',
                },
                distributed: {
                  value: 1374.20754778865626,
                  units: 'USD',
                },
                total: {
                  value: 18130.552485972168,
                  units: 'USD',
                },
              },
            },
          ],
        },
        {
          affiliate: 'ACME - Tunnels',
          values: [
            {
              date: '2022-01',
              affiliate: 'ACME - Tunnels',
              source_uuid: ['7b2cf7da-d494-4f4d-b640-f9fa57a0fe1c', 'a99443de-af6d-4b4b-a1d9-fdeea529606d'],
              clusters: ['OpenShift on AWS - Nise Populator', 'OpenShift on GCP - Nise Populator'],
              infrastructure: {
                raw: {
                  value: 12734.911686451038,
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
                  value: 12734.911686451038,
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
                  value: 16088.5,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 16088.5,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 12734.911686451038,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 16088.5,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 18823.411686451038,
                  units: 'USD',
                },
              },
            },
          ],
        },
      ],
    },
    {
      date: '2022-02',
      affiliates: [
        {
          affiliate: 'ACME - Anvils',
          values: [
            {
              date: '2022-02',
              affiliate: 'ACME - Anvils',
              source_uuid: ['7b2cf7da-d494-4f4d-b640-f9fa57a0fe1c', 'a99443de-af6d-4b4b-a1d9-fdeea529606d'],
              clusters: ['OpenShift on AWS - Nise Populator', 'OpenShift on GCP - Nise Populator'],
              infrastructure: {
                raw: {
                  value: 11896.9065085362465,
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
                  value: 11896.9065085362465,
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
                  value: 15664,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 15664,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 11896.9065085362465,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 15664,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 17560.906508536246,
                  units: 'USD',
                },
              },
            },
          ],
        },
        {
          affiliate: 'ACME - Fireworks',
          values: [
            {
              date: '2022-02',
              affiliate: 'ACME - Fireworks',
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
                  value: 11228.540293096156,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 12412.27805,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 13640.818343096156,
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
                  value: 11645.5,
                  units: 'USD',
                },
                distributed: {
                  value: 1303.02220048269066,
                  units: 'USD',
                },
                total: {
                  value: 11948.5222004826906,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 11228.540293096156,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 14057.77805,
                  units: 'USD',
                },
                distributed: {
                  value: 1303.02220048269066,
                  units: 'USD',
                },
                total: {
                  value: 15589.340543578846,
                  units: 'USD',
                },
              },
            },
          ],
        },
        {
          affiliate: 'ACME - Tunnels',
          values: [
            {
              date: '2022-02',
              affiliate: 'ACME - Tunnels',
              source_uuid: ['7b2cf7da-d494-4f4d-b640-f9fa57a0fe1c', 'a99443de-af6d-4b4b-a1d9-fdeea529606d'],
              clusters: ['OpenShift on AWS - Nise Populator', 'OpenShift on GCP - Nise Populator'],
              infrastructure: {
                raw: {
                  value: 1875.1810565474063,
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
                  value: 1875.1810565474063,
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
                  value: 13302.79,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 13302.79,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 1875.1810565474063,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 13302.79,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 14177.971056547406,
                  units: 'USD',
                },
              },
            },
          ],
        },
      ],
    },
    {
      date: '2022-03',
      affiliates: [
        {
          affiliate: 'ACME - Anvils',
          values: [
            {
              date: '2022-03',
              affiliate: 'ACME - Anvils',
              source_uuid: ['7b2cf7da-d494-4f4d-b640-f9fa57a0fe1c', 'a99443de-af6d-4b4b-a1d9-fdeea529606d'],
              clusters: ['OpenShift on AWS - Nise Populator', 'OpenShift on GCP - Nise Populator'],
              infrastructure: {
                raw: {
                  value: 13392.2000140326872,
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
                  value: 13392.2000140326872,
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
                  value: 17136,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 17136,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 13392.2000140326872,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 17136,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 110528.200014032687,
                  units: 'USD',
                },
              },
            },
          ],
        },
        {
          affiliate: 'ACME - Fireworks',
          values: [
            {
              date: '2022-03',
              affiliate: 'ACME - Fireworks',
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
                  value: 1797.1670545550679,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 12293.9787,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 13091.145754555068,
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
                  value: 12064.61,
                  units: 'USD',
                },
                distributed: {
                  value: 1394.13103598871703,
                  units: 'USD',
                },
                total: {
                  value: 12458.741035988717,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 1797.1670545550679,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 14358.5887,
                  units: 'USD',
                },
                distributed: {
                  value: 1394.13103598871703,
                  units: 'USD',
                },
                total: {
                  value: 15549.886790543785,
                  units: 'USD',
                },
              },
            },
          ],
        },
        {
          affiliate: 'ACME - Tunnels',
          values: [
            {
              date: '2022-03',
              affiliate: 'ACME - Tunnels',
              source_uuid: ['7b2cf7da-d494-4f4d-b640-f9fa57a0fe1c', 'a99443de-af6d-4b4b-a1d9-fdeea529606d'],
              clusters: ['OpenShift on AWS - Nise Populator', 'OpenShift on GCP - Nise Populator'],
              infrastructure: {
                raw: {
                  value: 11619.181524760065,
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
                  value: 11619.181524760065,
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
                  value: 14136.77,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 14136.77,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 11619.181524760065,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 14136.77,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 15755.951524760065,
                  units: 'USD',
                },
              },
            },
          ],
        },
      ],
    },
    {
      date: '2022-04',
      affiliates: [
        {
          affiliate: 'ACME - Anvils',
          values: [
            {
              date: '2022-04',
              affiliate: 'ACME - Anvils',
              source_uuid: ['7b2cf7da-d494-4f4d-b640-f9fa57a0fe1c', 'a99443de-af6d-4b4b-a1d9-fdeea529606d'],
              clusters: ['OpenShift on AWS - Nise Populator', 'OpenShift on GCP - Nise Populator'],
              infrastructure: {
                raw: {
                  value: 1939.9514813845437,
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
                  value: 1939.9514813845437,
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
                  value: 18944,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 12944,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 1939.9514813845437,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 18944,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 13883.9514813845435,
                  units: 'USD',
                },
              },
            },
          ],
        },
        {
          affiliate: 'ACME - Fireworks',
          values: [
            {
              date: '2022-04',
              affiliate: 'ACME - Fireworks',
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
                  value: 156.11350541913017,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 11546.3948,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 11596.50830541913,
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
                  value: 11436.54,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 11436.54,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 156.11350541913017,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 12382.9348,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 12433.04830541913,
                  units: 'USD',
                },
              },
            },
          ],
        },
        {
          affiliate: 'ACME - Tunnels',
          values: [
            {
              date: '2022-04',
              affiliate: 'ACME - Tunnels',
              source_uuid: ['7b2cf7da-d494-4f4d-b640-f9fa57a0fe1c', 'a99443de-af6d-4b4b-a1d9-fdeea529606d'],
              clusters: ['OpenShift on AWS - Nise Populator', 'OpenShift on GCP - Nise Populator'],
              infrastructure: {
                raw: {
                  value: 1179.70350866113299,
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
                  value: 1179.70350866113299,
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
                  value: 12312.64,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 12312.64,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 1179.70350866113299,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 12312.64,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 12432.343508661133,
                  units: 'USD',
                },
              },
            },
          ],
        },
      ],
    },
    {
      date: '2022-05',
      affiliates: [
        {
          affiliate: 'ACME - Anvils',
          values: [
            {
              date: '2022-05',
              affiliate: 'ACME - Anvils',
              source_uuid: ['7b2cf7da-d494-4f4d-b640-f9fa57a0fe1c', 'a99443de-af6d-4b4b-a1d9-fdeea529606d'],
              clusters: ['OpenShift on AWS - Nise Populator', 'OpenShift on GCP - Nise Populator'],
              infrastructure: {
                raw: {
                  value: 1839.9514813845437,
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
                  value: 1839.9514813845437,
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
                  value: 17944,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 17944,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 1839.9514813845437,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 16944,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 13683.9514813845435,
                  units: 'USD',
                },
              },
            },
          ],
        },
        {
          affiliate: 'ACME - Fireworks',
          values: [
            {
              date: '2022-05',
              affiliate: 'ACME - Fireworks',
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
                  value: 154.11350541913017,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 11346.3948,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 11396.50830541913,
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
                  value: 11236.54,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 11236.54,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 154.11350541913017,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 12182.9348,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 12233.04830541913,
                  units: 'USD',
                },
              },
            },
          ],
        },
        {
          affiliate: 'ACME - Tunnels',
          values: [
            {
              date: '2022-05',
              affiliate: 'ACME - Tunnels',
              source_uuid: ['7b2cf7da-d494-4f4d-b640-f9fa57a0fe1c', 'a99443de-af6d-4b4b-a1d9-fdeea529606d'],
              clusters: ['OpenShift on AWS - Nise Populator', 'OpenShift on GCP - Nise Populator'],
              infrastructure: {
                raw: {
                  value: 1149.70350866113299,
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
                  value: 1149.70350866113299,
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
                  value: 12012.64,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 12012.64,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 1149.70350866113299,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 12012.64,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 12132.343508661133,
                  units: 'USD',
                },
              },
            },
          ],
        },
      ],
    },
    {
      date: '2022-06',
      affiliates: [
        {
          affiliate: 'ACME - Anvils',
          values: [
            {
              date: '2022-06',
              affiliate: 'ACME - Anvils',
              source_uuid: ['7b2cf7da-d494-4f4d-b640-f9fa57a0fe1c', 'a99443de-af6d-4b4b-a1d9-fdeea529606d'],
              clusters: ['OpenShift on AWS - Nise Populator', 'OpenShift on GCP - Nise Populator'],
              infrastructure: {
                raw: {
                  value: 1339.9514813845437,
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
                  value: 1339.9514813845437,
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
                  value: 12944,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 12944,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 1339.9514813845437,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 12944,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 13283.9514813845435,
                  units: 'USD',
                },
              },
            },
          ],
        },
        {
          affiliate: 'ACME - Fireworks',
          values: [
            {
              date: '2022-06',
              affiliate: 'ACME - Fireworks',
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
                  value: 150.11350541913017,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 1946.3948,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 1996.5083054191301,
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
                  value: 1836.54,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 1836.54,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 150.11350541913017,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 11782.9348,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 11833.0483054191302,
                  units: 'USD',
                },
              },
            },
          ],
        },
        {
          affiliate: 'ACME - Tunnels',
          values: [
            {
              date: '2022-06',
              affiliate: 'ACME - Tunnels',
              source_uuid: ['7b2cf7da-d494-4f4d-b640-f9fa57a0fe1c', 'a99443de-af6d-4b4b-a1d9-fdeea529606d'],
              clusters: ['OpenShift on AWS - Nise Populator', 'OpenShift on GCP - Nise Populator'],
              infrastructure: {
                raw: {
                  value: 1119.70350866113299,
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
                  value: 1119.70350866113299,
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
                  value: 11712.64,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 11712.64,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 1119.70350866113299,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 11712.64,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 11832.343508661133,
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
      affiliates: [
        {
          affiliate: 'ACME - Anvils',
          values: [
            {
              date: '2022-07',
              affiliate: 'ACME - Anvils',
              source_uuid: ['7b2cf7da-d494-4f4d-b640-f9fa57a0fe1c', 'a99443de-af6d-4b4b-a1d9-fdeea529606d'],
              clusters: ['OpenShift on AWS - Nise Populator', 'OpenShift on GCP - Nise Populator'],
              infrastructure: {
                raw: {
                  value: 16014.457048413701,
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
                  value: 16014.457048413701,
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
                  value: 110448,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 110448,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 16014.457048413701,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 110448,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 116462.4570484137,
                  units: 'USD',
                },
              },
            },
          ],
        },
        {
          affiliate: 'ACME - Fireworks',
          values: [
            {
              date: '2022-07',
              affiliate: 'ACME - Fireworks',
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
                  value: 11329.1420881835122,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 13358.67285,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 14687.814938183512,
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
                  value: 13068.53,
                  units: 'USD',
                },
                distributed: {
                  value: 1374.20754778865626,
                  units: 'USD',
                },
                total: {
                  value: 13442.7375477886562,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 11329.1420881835122,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 16427.20285,
                  units: 'USD',
                },
                distributed: {
                  value: 1374.20754778865626,
                  units: 'USD',
                },
                total: {
                  value: 18130.552485972168,
                  units: 'USD',
                },
              },
            },
          ],
        },
        {
          affiliate: 'ACME - Tunnels',
          values: [
            {
              date: '2022-07',
              affiliate: 'ACME - Tunnels',
              source_uuid: ['7b2cf7da-d494-4f4d-b640-f9fa57a0fe1c', 'a99443de-af6d-4b4b-a1d9-fdeea529606d'],
              clusters: ['OpenShift on AWS - Nise Populator', 'OpenShift on GCP - Nise Populator'],
              infrastructure: {
                raw: {
                  value: 12734.911686451038,
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
                  value: 12734.911686451038,
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
                  value: 16088.5,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 16088.5,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 12734.911686451038,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 16088.5,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 18823.411686451038,
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
      affiliates: [
        {
          affiliate: 'ACME - Anvils',
          values: [
            {
              date: '2022-08',
              affiliate: 'ACME - Anvils',
              source_uuid: ['7b2cf7da-d494-4f4d-b640-f9fa57a0fe1c', 'a99443de-af6d-4b4b-a1d9-fdeea529606d'],
              clusters: ['OpenShift on AWS - Nise Populator', 'OpenShift on GCP - Nise Populator'],
              infrastructure: {
                raw: {
                  value: 13392.2000140326872,
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
                  value: 13392.2000140326872,
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
                  value: 17136,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 17136,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 13392.2000140326872,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 17136,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 110528.200014032687,
                  units: 'USD',
                },
              },
            },
          ],
        },
        {
          affiliate: 'ACME - Fireworks',
          values: [
            {
              date: '2022-08',
              affiliate: 'ACME - Fireworks',
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
                  value: 1797.1670545550679,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 12293.9787,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 13091.145754555068,
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
                  value: 12064.61,
                  units: 'USD',
                },
                distributed: {
                  value: 1394.13103598871703,
                  units: 'USD',
                },
                total: {
                  value: 12458.741035988717,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 1797.1670545550679,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 14358.5887,
                  units: 'USD',
                },
                distributed: {
                  value: 1394.13103598871703,
                  units: 'USD',
                },
                total: {
                  value: 15549.886790543785,
                  units: 'USD',
                },
              },
            },
          ],
        },
        {
          affiliate: 'ACME - Tunnels',
          values: [
            {
              date: '2022-08',
              affiliate: 'ACME - Tunnels',
              source_uuid: ['7b2cf7da-d494-4f4d-b640-f9fa57a0fe1c', 'a99443de-af6d-4b4b-a1d9-fdeea529606d'],
              clusters: ['OpenShift on AWS - Nise Populator', 'OpenShift on GCP - Nise Populator'],
              infrastructure: {
                raw: {
                  value: 11619.181524760065,
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
                  value: 11619.181524760065,
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
                  value: 14136.77,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 14136.77,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 11619.181524760065,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 14136.77,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 15755.951524760065,
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
      affiliates: [
        {
          affiliate: 'ACME - Anvils',
          values: [
            {
              date: '2022-09',
              affiliate: 'ACME - Anvils',
              source_uuid: ['7b2cf7da-d494-4f4d-b640-f9fa57a0fe1c', 'a99443de-af6d-4b4b-a1d9-fdeea529606d'],
              clusters: ['OpenShift on AWS - Nise Populator', 'OpenShift on GCP - Nise Populator'],
              infrastructure: {
                raw: {
                  value: 13392.2000140326872,
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
                  value: 13392.2000140326872,
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
                  value: 17136,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 17136,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 13392.2000140326872,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 17136,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 110528.200014032687,
                  units: 'USD',
                },
              },
            },
          ],
        },
        {
          affiliate: 'ACME - Fireworks',
          values: [
            {
              date: '2022-09',
              affiliate: 'ACME - Fireworks',
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
                  value: 1797.1670545550679,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 12293.9787,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 13091.145754555068,
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
                  value: 12064.61,
                  units: 'USD',
                },
                distributed: {
                  value: 1394.13103598871703,
                  units: 'USD',
                },
                total: {
                  value: 12458.741035988717,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 1797.1670545550679,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 14358.5887,
                  units: 'USD',
                },
                distributed: {
                  value: 1394.13103598871703,
                  units: 'USD',
                },
                total: {
                  value: 15549.886790543785,
                  units: 'USD',
                },
              },
            },
          ],
        },
        {
          affiliate: 'ACME - Tunnels',
          values: [
            {
              date: '2022-09',
              affiliate: 'ACME - Tunnels',
              source_uuid: ['7b2cf7da-d494-4f4d-b640-f9fa57a0fe1c', 'a99443de-af6d-4b4b-a1d9-fdeea529606d'],
              clusters: ['OpenShift on AWS - Nise Populator', 'OpenShift on GCP - Nise Populator'],
              infrastructure: {
                raw: {
                  value: 11619.181524760065,
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
                  value: 11619.181524760065,
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
                  value: 14136.77,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 14136.77,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 11619.181524760065,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 14136.77,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 15755.951524760065,
                  units: 'USD',
                },
              },
            },
          ],
        },
      ],
    },
    /*
    {
      date: '2022-10',
      affiliates: [
        {
          affiliate: 'ACME - Anvils',
          values: [
            {
              date: '2022-10',
              affiliate: 'ACME - Anvils',
              source_uuid: ['7b2cf7da-d494-4f4d-b640-f9fa57a0fe1c', 'a99443de-af6d-4b4b-a1d9-fdeea529606d'],
              clusters: ['OpenShift on AWS - Nise Populator', 'OpenShift on GCP - Nise Populator'],
              infrastructure: {
                raw: {
                  value: 1939.9514813845437,
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
                  value: 1939.9514813845437,
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
                  value: 18944,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 12944,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 1939.9514813845437,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 18944,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 13883.9514813845435,
                  units: 'USD',
                },
              },
            },
          ],
        },
        {
          affiliate: 'ACME - Fireworks',
          values: [
            {
              date: '2022-10',
              affiliate: 'ACME - Fireworks',
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
                  value: 156.11350541913017,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 11546.3948,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 11596.50830541913,
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
                  value: 11436.54,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 11436.54,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 156.11350541913017,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 12382.9348,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 12433.04830541913,
                  units: 'USD',
                },
              },
            },
          ],
        },
        {
          affiliate: 'ACME - Tunnels',
          values: [
            {
              date: '2022-10',
              affiliate: 'ACME - Tunnels',
              source_uuid: ['7b2cf7da-d494-4f4d-b640-f9fa57a0fe1c', 'a99443de-af6d-4b4b-a1d9-fdeea529606d'],
              clusters: ['OpenShift on AWS - Nise Populator', 'OpenShift on GCP - Nise Populator'],
              infrastructure: {
                raw: {
                  value: 1179.70350866113299,
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
                  value: 1179.70350866113299,
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
                  value: 12312.64,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 12312.64,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 1179.70350866113299,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 12312.64,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 12432.343508661133,
                  units: 'USD',
                },
              },
            },
          ],
        },
      ],
    },

     */
  ],
};
