// https://console.stage.redhat.com/api/cost-management/v1/reports/openshift/costs/?filter[limit]=3&group_by[source_of_spend]=*&start_date=2022-06-23&end_date=2022-09-21&filter[resolution]=monthly

export const sourceData = {
  meta: {
    count: 3,
    start_date: '2022-06-23',
    end_date: '2022-09-21',
    filter: {
      resolution: 'monthly',
      limit: 3,
    },
    group_by: {
      source_of_spend: ['*'],
    },
    order_by: {},
    total: {
      infrastructure: {
        raw: {
          value: 33658.682170681524,
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
          value: 163418.32965240197,
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
          value: 87187.64,
          units: 'USD',
        },
        distributed: {
          value: 15000,
          units: 'USD',
        },
        total: {
          value: 102187.64,
          units: 'USD',
        },
      },
      cost: {
        raw: {
          value: 33658.682170681524,
          units: 'USD',
        },
        markup: {
          value: 0,
          units: 'USD',
        },
        usage: {
          value: 213347.28748172044,
          units: 'USD',
        },
        distributed: {
          value: 18600,
          units: 'USD',
        },
        total: {
          value: 265605.969652402,
          units: 'USD',
        },
      },
    },
  },
  links: {
    first:
      '/api/cost-management/v1/reports/openshift/costs/?end_date=2022-09-21&filter%5Blimit%5D=3&filter%5Bresolution%5D=monthly&group_by%5Bsource_of_spend%5D=%2A&limit=100&offset=0&start_date=2022-06-23',
    next: null,
    previous: null,
    last: '/api/cost-management/v1/reports/openshift/costs/?end_date=2022-09-21&filter%5Blimit%5D=3&filter%5Bresolution%5D=monthly&group_by%5Bsource_of_spend%5D=%2A&limit=100&offset=0&start_date=2022-06-23',
  },
  data: [
    {
      date: '2021-10',
      source_of_spends: [
        {
          source_of_spend: 'Yearly Subs',
          values: [
            {
              date: '2021-10',
              source_of_spend: 'Yearly Subs',
              source_uuid: ['7b2cf7da-d494-4f4d-b640-f9fa57a0fe1c', 'a99443de-af6d-4b4b-a1d9-fdeea529606d'],
              clusters: ['OpenShift on AWS - Nise Populator', 'OpenShift on GCP - Nise Populator'],
              infrastructure: {
                raw: {
                  value: 1896.9065085362465,
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
                  value: 1896.9065085362465,
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
                  value: 5664,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 5664,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 1896.9065085362465,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 5664,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 7560.906508536246,
                  units: 'USD',
                },
              },
            },
          ],
        },
        {
          source_of_spend: 'Red Hat Marketplace',
          values: [
            {
              date: '2021-10',
              source_of_spend: 'Insights for RHEL',
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
                  value: 1228.540293096156,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 2412.27805,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 3640.818343096156,
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
                  value: 1645.5,
                  units: 'USD',
                },
                distributed: {
                  value: 303.02220048269066,
                  units: 'USD',
                },
                total: {
                  value: 1948.5222004826906,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 1228.540293096156,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 4057.77805,
                  units: 'USD',
                },
                distributed: {
                  value: 303.02220048269066,
                  units: 'USD',
                },
                total: {
                  value: 5589.340543578846,
                  units: 'USD',
                },
              },
            },
          ],
        },
        {
          source_of_spend: 'Reseller / Distributor',
          values: [
            {
              date: '2021-10',
              source_of_spend: 'Reseller / Distributor',
              source_uuid: ['7b2cf7da-d494-4f4d-b640-f9fa57a0fe1c', 'a99443de-af6d-4b4b-a1d9-fdeea529606d'],
              clusters: ['OpenShift on AWS - Nise Populator', 'OpenShift on GCP - Nise Populator'],
              infrastructure: {
                raw: {
                  value: 875.1810565474063,
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
                  value: 875.1810565474063,
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
                  value: 3302.79,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 3302.79,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 875.1810565474063,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 3302.79,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 4177.971056547406,
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
      source_of_spends: [
        {
          source_of_spend: 'Yearly Subs',
          values: [
            {
              date: '2021-11',
              source_of_spend: 'Yearly Subs',
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
          source_of_spend: 'Insights for RHEL',
          values: [
            {
              date: '2021-11',
              source_of_spend: 'Insights for RHEL',
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
          source_of_spend: 'Reseller / Distributor',
          values: [
            {
              date: '2021-11',
              source_of_spend: 'Reseller / Distributor',
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
      ],
    },
    {
      date: '2021-12',
      source_of_spends: [
        {
          source_of_spend: 'Yearly Subs',
          values: [
            {
              date: '2021-12',
              source_of_spend: 'Yearly Subs',
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
          source_of_spend: 'Insights for RHEL',
          values: [
            {
              date: '2021-12',
              source_of_spend: 'Insights for RHEL',
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
          source_of_spend: 'Reseller / Distributor',
          values: [
            {
              date: '2021-12',
              source_of_spend: 'Reseller / Distributor',
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
      ],
    },

    {
      date: '2022-01',
      source_of_spends: [
        {
          source_of_spend: 'Yearly Subs',
          values: [
            {
              date: '2022-01',
              source_of_spend: 'Yearly Subs',
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
          source_of_spend: 'Insights for RHEL',
          values: [
            {
              date: '2022-01',
              source_of_spend: 'Insights for RHEL',
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
          source_of_spend: 'Reseller / Distributor',
          values: [
            {
              date: '2022-01',
              source_of_spend: 'Reseller / Distributor',
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
      ],
    },
    {
      date: '2022-02',
      source_of_spends: [
        {
          source_of_spend: 'Yearly Subs',
          values: [
            {
              date: '2022-02',
              source_of_spend: 'Yearly Subs',
              source_uuid: ['7b2cf7da-d494-4f4d-b640-f9fa57a0fe1c', 'a99443de-af6d-4b4b-a1d9-fdeea529606d'],
              clusters: ['OpenShift on AWS - Nise Populator', 'OpenShift on GCP - Nise Populator'],
              infrastructure: {
                raw: {
                  value: 1896.9065085362465,
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
                  value: 1896.9065085362465,
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
                  value: 5664,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 5664,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 1896.9065085362465,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 5664,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 7560.906508536246,
                  units: 'USD',
                },
              },
            },
          ],
        },
        {
          source_of_spend: 'Insights for RHEL',
          values: [
            {
              date: '2022-02',
              source_of_spend: 'Insights for RHEL',
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
                  value: 1228.540293096156,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 2412.27805,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 3640.818343096156,
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
                  value: 1645.5,
                  units: 'USD',
                },
                distributed: {
                  value: 303.02220048269066,
                  units: 'USD',
                },
                total: {
                  value: 1948.5222004826906,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 1228.540293096156,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 4057.77805,
                  units: 'USD',
                },
                distributed: {
                  value: 303.02220048269066,
                  units: 'USD',
                },
                total: {
                  value: 5589.340543578846,
                  units: 'USD',
                },
              },
            },
          ],
        },
        {
          source_of_spend: 'Reseller / Distributor',
          values: [
            {
              date: '2022-02',
              source_of_spend: 'Reseller / Distributor',
              source_uuid: ['7b2cf7da-d494-4f4d-b640-f9fa57a0fe1c', 'a99443de-af6d-4b4b-a1d9-fdeea529606d'],
              clusters: ['OpenShift on AWS - Nise Populator', 'OpenShift on GCP - Nise Populator'],
              infrastructure: {
                raw: {
                  value: 875.1810565474063,
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
                  value: 875.1810565474063,
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
                  value: 3302.79,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 3302.79,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 875.1810565474063,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 3302.79,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 4177.971056547406,
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
      source_of_spends: [
        {
          source_of_spend: 'Yearly Subs',
          values: [
            {
              date: '2022-03',
              source_of_spend: 'Yearly Subs',
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
          source_of_spend: 'Insights for RHEL',
          values: [
            {
              date: '2022-03',
              source_of_spend: 'Insights for RHEL',
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
          source_of_spend: 'Reseller / Distributor',
          values: [
            {
              date: '2022-03',
              source_of_spend: 'Reseller / Distributor',
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
      ],
    },
    {
      date: '2022-04',
      source_of_spends: [
        {
          source_of_spend: 'Yearly Subs',
          values: [
            {
              date: '2022-04',
              source_of_spend: 'Yearly Subs',
              source_uuid: ['7b2cf7da-d494-4f4d-b640-f9fa57a0fe1c', 'a99443de-af6d-4b4b-a1d9-fdeea529606d'],
              clusters: ['OpenShift on AWS - Nise Populator', 'OpenShift on GCP - Nise Populator'],
              infrastructure: {
                raw: {
                  value: 939.9514813845437,
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
                  value: 939.9514813845437,
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
                  value: 8944,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 2944,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 939.9514813845437,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 8944,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 3883.9514813845435,
                  units: 'USD',
                },
              },
            },
          ],
        },
        {
          source_of_spend: 'Insights for RHEL',
          values: [
            {
              date: '2022-04',
              source_of_spend: 'Insights for RHEL',
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
                  value: 56.11350541913017,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 1546.3948,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 1596.50830541913,
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
                  value: 1436.54,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 1436.54,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 56.11350541913017,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 2382.9348,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 2433.04830541913,
                  units: 'USD',
                },
              },
            },
          ],
        },
        {
          source_of_spend: 'Reseller / Distributor',
          values: [
            {
              date: '2022-04',
              source_of_spend: 'Reseller / Distributor',
              source_uuid: ['7b2cf7da-d494-4f4d-b640-f9fa57a0fe1c', 'a99443de-af6d-4b4b-a1d9-fdeea529606d'],
              clusters: ['OpenShift on AWS - Nise Populator', 'OpenShift on GCP - Nise Populator'],
              infrastructure: {
                raw: {
                  value: 179.70350866113299,
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
                  value: 179.70350866113299,
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
                  value: 2312.64,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 2312.64,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 179.70350866113299,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 2312.64,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 2432.343508661133,
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
      source_of_spends: [
        {
          source_of_spend: 'Yearly Subs',
          values: [
            {
              date: '2022-05',
              source_of_spend: 'Yearly Subs',
              source_uuid: ['7b2cf7da-d494-4f4d-b640-f9fa57a0fe1c', 'a99443de-af6d-4b4b-a1d9-fdeea529606d'],
              clusters: ['OpenShift on AWS - Nise Populator', 'OpenShift on GCP - Nise Populator'],
              infrastructure: {
                raw: {
                  value: 839.9514813845437,
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
                  value: 839.9514813845437,
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
                  value: 7944,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 7944,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 839.9514813845437,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 6944,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 3683.9514813845435,
                  units: 'USD',
                },
              },
            },
          ],
        },
        {
          source_of_spend: 'Insights for RHEL',
          values: [
            {
              date: '2022-05',
              source_of_spend: 'Insights for RHEL',
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
                  value: 54.11350541913017,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 1346.3948,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 1396.50830541913,
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
                  value: 1236.54,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 1236.54,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 54.11350541913017,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 2182.9348,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 2233.04830541913,
                  units: 'USD',
                },
              },
            },
          ],
        },
        {
          source_of_spend: 'Reseller / Distributor',
          values: [
            {
              date: '2022-05',
              source_of_spend: 'Reseller / Distributor',
              source_uuid: ['7b2cf7da-d494-4f4d-b640-f9fa57a0fe1c', 'a99443de-af6d-4b4b-a1d9-fdeea529606d'],
              clusters: ['OpenShift on AWS - Nise Populator', 'OpenShift on GCP - Nise Populator'],
              infrastructure: {
                raw: {
                  value: 149.70350866113299,
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
                  value: 149.70350866113299,
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
                  value: 2012.64,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 2012.64,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 149.70350866113299,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 2012.64,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 2132.343508661133,
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
      source_of_spends: [
        {
          source_of_spend: 'Yearly Subs',
          values: [
            {
              date: '2022-06',
              source_of_spend: 'Yearly Subs',
              source_uuid: ['7b2cf7da-d494-4f4d-b640-f9fa57a0fe1c', 'a99443de-af6d-4b4b-a1d9-fdeea529606d'],
              clusters: ['OpenShift on AWS - Nise Populator', 'OpenShift on GCP - Nise Populator'],
              infrastructure: {
                raw: {
                  value: 339.9514813845437,
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
                  value: 339.9514813845437,
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
                  value: 2944,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 2944,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 339.9514813845437,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 2944,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 3283.9514813845435,
                  units: 'USD',
                },
              },
            },
          ],
        },
        {
          source_of_spend: 'Insights for RHEL',
          values: [
            {
              date: '2022-06',
              source_of_spend: 'Insights for RHEL',
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
                  value: 50.11350541913017,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 946.3948,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 996.5083054191301,
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
                  value: 836.54,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 836.54,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 50.11350541913017,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 1782.9348,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 1833.0483054191302,
                  units: 'USD',
                },
              },
            },
          ],
        },
        {
          source_of_spend: 'Reseller / Distributor',
          values: [
            {
              date: '2022-06',
              source_of_spend: 'Reseller / Distributor',
              source_uuid: ['7b2cf7da-d494-4f4d-b640-f9fa57a0fe1c', 'a99443de-af6d-4b4b-a1d9-fdeea529606d'],
              clusters: ['OpenShift on AWS - Nise Populator', 'OpenShift on GCP - Nise Populator'],
              infrastructure: {
                raw: {
                  value: 119.70350866113299,
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
                  value: 119.70350866113299,
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
                  value: 1712.64,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 1712.64,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 119.70350866113299,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 1712.64,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 1832.343508661133,
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
      source_of_spends: [
        {
          source_of_spend: 'Yearly Subs',
          values: [
            {
              date: '2022-07',
              source_of_spend: 'Yearly Subs',
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
          source_of_spend: 'Insights for RHEL',
          values: [
            {
              date: '2022-07',
              source_of_spend: 'Insights for RHEL',
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
          source_of_spend: 'Reseller / Distributor',
          values: [
            {
              date: '2022-07',
              source_of_spend: 'Reseller / Distributor',
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
      ],
    },
    {
      date: '2022-08',
      source_of_spends: [
        {
          source_of_spend: 'Yearly Subs',
          values: [
            {
              date: '2022-08',
              source_of_spend: 'Yearly Subs',
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
          source_of_spend: 'Insights for RHEL',
          values: [
            {
              date: '2022-08',
              source_of_spend: 'Insights for RHEL',
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
          source_of_spend: 'Reseller / Distributor',
          values: [
            {
              date: '2022-08',
              source_of_spend: 'Reseller / Distributor',
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
      ],
    },
  ],
};
