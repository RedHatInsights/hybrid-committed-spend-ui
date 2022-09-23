/* eslint-disable @typescript-eslint/no-loss-of-precision */

// https://console.stage.redhat.com/api/cost-management/v1/reports/openshift/costs/?filter[limit]=3&group_by[project]=*&start_date=2022-06-23&end_date=2022-09-21&filter[resolution]=monthly

export const productsData = {
  meta: {
    count: 4,
    others: 22,
    start_date: '2022-06-23',
    end_date: '2022-09-21',
    filter: {
      resolution: 'monthly',
      limit: 3,
    },
    group_by: {
      project: ['*'],
    },
    order_by: {},
    total: {
      infrastructure: {
        raw: {
          value: 233658.682170681524,
          units: 'USD',
        },
        markup: {
          value: 0,
          units: 'USD',
        },
        usage: {
          value: 22126159.64748172043,
          units: 'USD',
        },
        distributed: {
          value: 23600,
          units: 'USD',
        },
        total: {
          value: 22163418.32965240197,
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
          value: 287187.64,
          units: 'USD',
        },
        distributed: {
          value: 2215000,
          units: 'USD',
        },
        total: {
          value: 22102187.64,
          units: 'USD',
        },
      },
      cost: {
        raw: {
          value: 233658.682170681524,
          units: 'USD',
        },
        markup: {
          value: 0,
          units: 'USD',
        },
        usage: {
          value: 2213347.28748172044,
          units: 'USD',
        },
        distributed: {
          value: 2218600,
          units: 'USD',
        },
        total: {
          value: 2265605.969652402,
          units: 'USD',
        },
      },
    },
  },
  links: {
    first:
      '/api/cost-management/v1/reports/openshift/costs/?end_date=2022-09-21&filter%5Blimit%5D=3&filter%5Bresolution%5D=monthly&group_by%5Bproject%5D=%2A&limit=100&offset=0&start_date=2022-06-23',
    next: null,
    previous: null,
    last: '/api/cost-management/v1/reports/openshift/costs/?end_date=2022-09-21&filter%5Blimit%5D=3&filter%5Bresolution%5D=monthly&group_by%5Bproject%5D=%2A&limit=100&offset=0&start_date=2022-06-23',
  },
  data: [
    {
      date: '2021-10',
      projects: [
        {
          project: 'OpenShift Container Platform',
          values: [
            {
              date: '2021-10',
              project: 'OpenShift Container Platform',
              source_uuid: ['7b2cf7da-d494-4f4d-b640-f9fa57a0fe1c', 'a99443de-af6d-4b4b-a1d9-fdeea529606d'],
              clusters: ['OpenShift on AWS - Nise Populator', 'OpenShift on GCP - Nise Populator'],
              infrastructure: {
                raw: {
                  value: 221896.9065085362465,
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
                  value: 221896.9065085362465,
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
                  value: 25664,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 25664,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 221896.9065085362465,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 25664,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 27560.906508536246,
                  units: 'USD',
                },
              },
            },
          ],
        },
        {
          project: 'Insights for RHEL',
          values: [
            {
              date: '2021-10',
              project: 'Insights for RHEL',
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
                  value: 221228.540293096156,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 22412.27805,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 23640.818343096156,
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
                  value: 221645.5,
                  units: 'USD',
                },
                distributed: {
                  value: 2303.02220048269066,
                  units: 'USD',
                },
                total: {
                  value: 221948.5222004826906,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 221228.540293096156,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 24057.77805,
                  units: 'USD',
                },
                distributed: {
                  value: 2303.02220048269066,
                  units: 'USD',
                },
                total: {
                  value: 25589.340543578846,
                  units: 'USD',
                },
              },
            },
          ],
        },
        {
          project: 'Ansible Engine',
          values: [
            {
              date: '2021-10',
              project: 'Ansible Engine',
              source_uuid: ['7b2cf7da-d494-4f4d-b640-f9fa57a0fe1c', 'a99443de-af6d-4b4b-a1d9-fdeea529606d'],
              clusters: ['OpenShift on AWS - Nise Populator', 'OpenShift on GCP - Nise Populator'],
              infrastructure: {
                raw: {
                  value: 2875.1810565474063,
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
                  value: 2875.1810565474063,
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
                  value: 23302.79,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 23302.79,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 2875.1810565474063,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 23302.79,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 24177.971056547406,
                  units: 'USD',
                },
              },
            },
          ],
        },
        {
          project: 'Others',
          values: [
            {
              date: '2021-10',
              project: 'Others',
              source_uuid: [
                'a99443de-af6d-4b4b-a1d9-fdeea529606d',
                '1899fc34-7096-47d6-82d8-e371268530b1',
                '7b2cf7da-d494-4f4d-b640-f9fa57a0fe1c',
                'ae7cd5c5-b6b8-4059-966d-0548287cb609',
              ],
              clusters: [
                'OpenShift on GCP - Nise Populator',
                'OpenShift on AWS - Nise Populator',
                'OpenShift on Azure - Nise Populator',
                'OpenShift on OpenStack - Nise Populator',
              ],
              infrastructure: {
                raw: {
                  value: 22176.0068953291475,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 231359.924316666667,
                  units: 'USD',
                },
                distributed: {
                  value: 221200,
                  units: 'USD',
                },
                total: {
                  value: 234735.93121199581,
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
                  value: 28261.69,
                  units: 'USD',
                },
                distributed: {
                  value: 24696.977799517309,
                  units: 'USD',
                },
                total: {
                  value: 2212958.667799517309,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 22176.0068953291475,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 239621.614316666666,
                  units: 'USD',
                },
                distributed: {
                  value: 25896.977799517309,
                  units: 'USD',
                },
                total: {
                  value: 247694.59901151312,
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
      projects: [
        {
          project: 'OpenShift Container Platform',
          values: [
            {
              date: '2021-11',
              project: 'OpenShift Container Platform',
              source_uuid: ['7b2cf7da-d494-4f4d-b640-f9fa57a0fe1c', 'a99443de-af6d-4b4b-a1d9-fdeea529606d'],
              clusters: ['OpenShift on AWS - Nise Populator', 'OpenShift on GCP - Nise Populator'],
              infrastructure: {
                raw: {
                  value: 23392.2000140326872,
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
                  value: 23392.2000140326872,
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
                  value: 27136,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 27136,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 23392.2000140326872,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 27136,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 2210528.200014032687,
                  units: 'USD',
                },
              },
            },
          ],
        },
        {
          project: 'Insights for RHEL',
          values: [
            {
              date: '2021-11',
              project: 'Insights for RHEL',
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
                  value: 2797.1670545550679,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 22293.9787,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 23091.145754555068,
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
                  value: 22064.61,
                  units: 'USD',
                },
                distributed: {
                  value: 2394.13103598871703,
                  units: 'USD',
                },
                total: {
                  value: 22458.741035988717,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 2797.1670545550679,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 24358.5887,
                  units: 'USD',
                },
                distributed: {
                  value: 2394.13103598871703,
                  units: 'USD',
                },
                total: {
                  value: 25549.886790543785,
                  units: 'USD',
                },
              },
            },
          ],
        },
        {
          project: 'Ansible Engine',
          values: [
            {
              date: '2021-11',
              project: 'Ansible Engine',
              source_uuid: ['7b2cf7da-d494-4f4d-b640-f9fa57a0fe1c', 'a99443de-af6d-4b4b-a1d9-fdeea529606d'],
              clusters: ['OpenShift on AWS - Nise Populator', 'OpenShift on GCP - Nise Populator'],
              infrastructure: {
                raw: {
                  value: 221619.181524760065,
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
                  value: 221619.181524760065,
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
                  value: 24136.77,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 24136.77,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 221619.181524760065,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 24136.77,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 25755.951524760065,
                  units: 'USD',
                },
              },
            },
          ],
        },
        {
          project: 'Others',
          values: [
            {
              date: '2021-11',
              project: 'Others',
              source_uuid: [
                'a99443de-af6d-4b4b-a1d9-fdeea529606d',
                '1899fc34-7096-47d6-82d8-e371268530b1',
                '7b2cf7da-d494-4f4d-b640-f9fa57a0fe1c',
                'ae7cd5c5-b6b8-4059-966d-0548287cb609',
              ],
              clusters: [
                'OpenShift on GCP - Nise Populator',
                'OpenShift on AWS - Nise Populator',
                'OpenShift on Azure - Nise Populator',
                'OpenShift on OpenStack - Nise Populator',
              ],
              infrastructure: {
                raw: {
                  value: 24035.5726649186668,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 229821.9931,
                  units: 'USD',
                },
                distributed: {
                  value: 221200,
                  units: 'USD',
                },
                total: {
                  value: 235057.56576491867,
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
                  value: 2210374.94,
                  units: 'USD',
                },
                distributed: {
                  value: 24605.868964011283,
                  units: 'USD',
                },
                total: {
                  value: 2214980.808964011283,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 24035.5726649186668,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 240196.9331,
                  units: 'USD',
                },
                distributed: {
                  value: 25805.868964011283,
                  units: 'USD',
                },
                total: {
                  value: 250038.37472892995,
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
      projects: [
        {
          project: 'OpenShift Container Platform',
          values: [
            {
              date: '2021-12',
              project: 'OpenShift Container Platform',
              source_uuid: ['7b2cf7da-d494-4f4d-b640-f9fa57a0fe1c', 'a99443de-af6d-4b4b-a1d9-fdeea529606d'],
              clusters: ['OpenShift on AWS - Nise Populator', 'OpenShift on GCP - Nise Populator'],
              infrastructure: {
                raw: {
                  value: 26014.457048413701,
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
                  value: 26014.457048413701,
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
                  value: 2210448,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 2210448,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 26014.457048413701,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 2210448,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 2216462.4570484137,
                  units: 'USD',
                },
              },
            },
          ],
        },
        {
          project: 'Insights for RHEL',
          values: [
            {
              date: '2021-12',
              project: 'Insights for RHEL',
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
                  value: 221329.1420881835122,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 23358.67285,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 24687.814938183512,
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
                  value: 23068.53,
                  units: 'USD',
                },
                distributed: {
                  value: 2374.20754778865626,
                  units: 'USD',
                },
                total: {
                  value: 23442.7375477886562,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 221329.1420881835122,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 26427.20285,
                  units: 'USD',
                },
                distributed: {
                  value: 2374.20754778865626,
                  units: 'USD',
                },
                total: {
                  value: 28130.552485972168,
                  units: 'USD',
                },
              },
            },
          ],
        },
        {
          project: 'Ansible Engine',
          values: [
            {
              date: '2021-12',
              project: 'Ansible Engine',
              source_uuid: ['7b2cf7da-d494-4f4d-b640-f9fa57a0fe1c', 'a99443de-af6d-4b4b-a1d9-fdeea529606d'],
              clusters: ['OpenShift on AWS - Nise Populator', 'OpenShift on GCP - Nise Populator'],
              infrastructure: {
                raw: {
                  value: 22734.911686451038,
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
                  value: 22734.911686451038,
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
                  value: 26088.5,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 26088.5,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 22734.911686451038,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 26088.5,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 28823.411686451038,
                  units: 'USD',
                },
              },
            },
          ],
        },
        {
          project: 'Others',
          values: [
            {
              date: '2021-12',
              project: 'Others',
              source_uuid: [
                'a99443de-af6d-4b4b-a1d9-fdeea529606d',
                '1899fc34-7096-47d6-82d8-e371268530b1',
                '7b2cf7da-d494-4f4d-b640-f9fa57a0fe1c',
                'ae7cd5c5-b6b8-4059-966d-0548287cb609',
              ],
              clusters: [
                'OpenShift on GCP - Nise Populator',
                'OpenShift on AWS - Nise Populator',
                'OpenShift on Azure - Nise Populator',
                'OpenShift on OpenStack - Nise Populator',
              ],
              infrastructure: {
                raw: {
                  value: 26766.332394984845,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 243663.150598387096,
                  units: 'USD',
                },
                distributed: {
                  value: 221200,
                  units: 'USD',
                },
                total: {
                  value: 251629.482993371945,
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
                  value: 2215234.56,
                  units: 'USD',
                },
                distributed: {
                  value: 24625.7924522113435,
                  units: 'USD',
                },
                total: {
                  value: 2219860.352452211344,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 26766.332394984845,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 258897.71059838709,
                  units: 'USD',
                },
                distributed: {
                  value: 25825.7924522113435,
                  units: 'USD',
                },
                total: {
                  value: 271489.83544558329,
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
      projects: [
        {
          project: 'OpenShift Container Platform',
          values: [
            {
              date: '2022-01',
              project: 'OpenShift Container Platform',
              source_uuid: ['7b2cf7da-d494-4f4d-b640-f9fa57a0fe1c', 'a99443de-af6d-4b4b-a1d9-fdeea529606d'],
              clusters: ['OpenShift on AWS - Nise Populator', 'OpenShift on GCP - Nise Populator'],
              infrastructure: {
                raw: {
                  value: 26014.457048413701,
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
                  value: 26014.457048413701,
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
                  value: 2210448,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 2210448,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 26014.457048413701,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 2210448,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 2216462.4570484137,
                  units: 'USD',
                },
              },
            },
          ],
        },
        {
          project: 'Insights for RHEL',
          values: [
            {
              date: '2022-01',
              project: 'Insights for RHEL',
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
                  value: 221329.1420881835122,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 23358.67285,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 24687.814938183512,
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
                  value: 23068.53,
                  units: 'USD',
                },
                distributed: {
                  value: 2374.20754778865626,
                  units: 'USD',
                },
                total: {
                  value: 23442.7375477886562,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 221329.1420881835122,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 26427.20285,
                  units: 'USD',
                },
                distributed: {
                  value: 2374.20754778865626,
                  units: 'USD',
                },
                total: {
                  value: 28130.552485972168,
                  units: 'USD',
                },
              },
            },
          ],
        },
        {
          project: 'Ansible Engine',
          values: [
            {
              date: '2022-01',
              project: 'Ansible Engine',
              source_uuid: ['7b2cf7da-d494-4f4d-b640-f9fa57a0fe1c', 'a99443de-af6d-4b4b-a1d9-fdeea529606d'],
              clusters: ['OpenShift on AWS - Nise Populator', 'OpenShift on GCP - Nise Populator'],
              infrastructure: {
                raw: {
                  value: 22734.911686451038,
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
                  value: 22734.911686451038,
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
                  value: 26088.5,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 26088.5,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 22734.911686451038,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 26088.5,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 28823.411686451038,
                  units: 'USD',
                },
              },
            },
          ],
        },
        {
          project: 'Others',
          values: [
            {
              date: '2022-01',
              project: 'Others',
              source_uuid: [
                'a99443de-af6d-4b4b-a1d9-fdeea529606d',
                '1899fc34-7096-47d6-82d8-e371268530b1',
                '7b2cf7da-d494-4f4d-b640-f9fa57a0fe1c',
                'ae7cd5c5-b6b8-4059-966d-0548287cb609',
              ],
              clusters: [
                'OpenShift on GCP - Nise Populator',
                'OpenShift on AWS - Nise Populator',
                'OpenShift on Azure - Nise Populator',
                'OpenShift on OpenStack - Nise Populator',
              ],
              infrastructure: {
                raw: {
                  value: 26766.332394984845,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 243663.150598387096,
                  units: 'USD',
                },
                distributed: {
                  value: 221200,
                  units: 'USD',
                },
                total: {
                  value: 251629.482993371945,
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
                  value: 2215234.56,
                  units: 'USD',
                },
                distributed: {
                  value: 24625.7924522113435,
                  units: 'USD',
                },
                total: {
                  value: 2219860.352452211344,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 26766.332394984845,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 258897.71059838709,
                  units: 'USD',
                },
                distributed: {
                  value: 25825.7924522113435,
                  units: 'USD',
                },
                total: {
                  value: 271489.83544558329,
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
      projects: [
        {
          project: 'OpenShift Container Platform',
          values: [
            {
              date: '2022-02',
              project: 'OpenShift Container Platform',
              source_uuid: ['7b2cf7da-d494-4f4d-b640-f9fa57a0fe1c', 'a99443de-af6d-4b4b-a1d9-fdeea529606d'],
              clusters: ['OpenShift on AWS - Nise Populator', 'OpenShift on GCP - Nise Populator'],
              infrastructure: {
                raw: {
                  value: 221896.9065085362465,
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
                  value: 221896.9065085362465,
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
                  value: 25664,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 25664,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 221896.9065085362465,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 25664,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 27560.906508536246,
                  units: 'USD',
                },
              },
            },
          ],
        },
        {
          project: 'Insights for RHEL',
          values: [
            {
              date: '2022-02',
              project: 'Insights for RHEL',
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
                  value: 221228.540293096156,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 22412.27805,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 23640.818343096156,
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
                  value: 221645.5,
                  units: 'USD',
                },
                distributed: {
                  value: 2303.02220048269066,
                  units: 'USD',
                },
                total: {
                  value: 221948.5222004826906,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 221228.540293096156,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 24057.77805,
                  units: 'USD',
                },
                distributed: {
                  value: 2303.02220048269066,
                  units: 'USD',
                },
                total: {
                  value: 25589.340543578846,
                  units: 'USD',
                },
              },
            },
          ],
        },
        {
          project: 'Ansible Engine',
          values: [
            {
              date: '2022-02',
              project: 'Ansible Engine',
              source_uuid: ['7b2cf7da-d494-4f4d-b640-f9fa57a0fe1c', 'a99443de-af6d-4b4b-a1d9-fdeea529606d'],
              clusters: ['OpenShift on AWS - Nise Populator', 'OpenShift on GCP - Nise Populator'],
              infrastructure: {
                raw: {
                  value: 2875.1810565474063,
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
                  value: 2875.1810565474063,
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
                  value: 23302.79,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 23302.79,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 2875.1810565474063,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 23302.79,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 24177.971056547406,
                  units: 'USD',
                },
              },
            },
          ],
        },
        {
          project: 'Others',
          values: [
            {
              date: '2022-02',
              project: 'Others',
              source_uuid: [
                'a99443de-af6d-4b4b-a1d9-fdeea529606d',
                '1899fc34-7096-47d6-82d8-e371268530b1',
                '7b2cf7da-d494-4f4d-b640-f9fa57a0fe1c',
                'ae7cd5c5-b6b8-4059-966d-0548287cb609',
              ],
              clusters: [
                'OpenShift on GCP - Nise Populator',
                'OpenShift on AWS - Nise Populator',
                'OpenShift on Azure - Nise Populator',
                'OpenShift on OpenStack - Nise Populator',
              ],
              infrastructure: {
                raw: {
                  value: 22176.0068953291475,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 231359.924316666667,
                  units: 'USD',
                },
                distributed: {
                  value: 221200,
                  units: 'USD',
                },
                total: {
                  value: 234735.93121199581,
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
                  value: 28261.69,
                  units: 'USD',
                },
                distributed: {
                  value: 24696.977799517309,
                  units: 'USD',
                },
                total: {
                  value: 2212958.667799517309,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 22176.0068953291475,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 239621.614316666666,
                  units: 'USD',
                },
                distributed: {
                  value: 25896.977799517309,
                  units: 'USD',
                },
                total: {
                  value: 247694.59901151312,
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
      projects: [
        {
          project: 'OpenShift Container Platform',
          values: [
            {
              date: '2022-03',
              project: 'OpenShift Container Platform',
              source_uuid: ['7b2cf7da-d494-4f4d-b640-f9fa57a0fe1c', 'a99443de-af6d-4b4b-a1d9-fdeea529606d'],
              clusters: ['OpenShift on AWS - Nise Populator', 'OpenShift on GCP - Nise Populator'],
              infrastructure: {
                raw: {
                  value: 23392.2000140326872,
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
                  value: 23392.2000140326872,
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
                  value: 27136,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 27136,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 23392.2000140326872,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 27136,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 2210528.200014032687,
                  units: 'USD',
                },
              },
            },
          ],
        },
        {
          project: 'Insights for RHEL',
          values: [
            {
              date: '2022-03',
              project: 'Insights for RHEL',
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
                  value: 2797.1670545550679,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 22293.9787,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 23091.145754555068,
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
                  value: 22064.61,
                  units: 'USD',
                },
                distributed: {
                  value: 2394.13103598871703,
                  units: 'USD',
                },
                total: {
                  value: 22458.741035988717,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 2797.1670545550679,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 24358.5887,
                  units: 'USD',
                },
                distributed: {
                  value: 2394.13103598871703,
                  units: 'USD',
                },
                total: {
                  value: 25549.886790543785,
                  units: 'USD',
                },
              },
            },
          ],
        },
        {
          project: 'Ansible Engine',
          values: [
            {
              date: '2022-03',
              project: 'Ansible Engine',
              source_uuid: ['7b2cf7da-d494-4f4d-b640-f9fa57a0fe1c', 'a99443de-af6d-4b4b-a1d9-fdeea529606d'],
              clusters: ['OpenShift on AWS - Nise Populator', 'OpenShift on GCP - Nise Populator'],
              infrastructure: {
                raw: {
                  value: 221619.181524760065,
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
                  value: 221619.181524760065,
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
                  value: 24136.77,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 24136.77,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 221619.181524760065,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 24136.77,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 25755.951524760065,
                  units: 'USD',
                },
              },
            },
          ],
        },
        {
          project: 'Others',
          values: [
            {
              date: '2022-03',
              project: 'Others',
              source_uuid: [
                'a99443de-af6d-4b4b-a1d9-fdeea529606d',
                '1899fc34-7096-47d6-82d8-e371268530b1',
                '7b2cf7da-d494-4f4d-b640-f9fa57a0fe1c',
                'ae7cd5c5-b6b8-4059-966d-0548287cb609',
              ],
              clusters: [
                'OpenShift on GCP - Nise Populator',
                'OpenShift on AWS - Nise Populator',
                'OpenShift on Azure - Nise Populator',
                'OpenShift on OpenStack - Nise Populator',
              ],
              infrastructure: {
                raw: {
                  value: 24035.5726649186668,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 229821.9931,
                  units: 'USD',
                },
                distributed: {
                  value: 221200,
                  units: 'USD',
                },
                total: {
                  value: 235057.56576491867,
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
                  value: 2210374.94,
                  units: 'USD',
                },
                distributed: {
                  value: 24605.868964011283,
                  units: 'USD',
                },
                total: {
                  value: 2214980.808964011283,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 24035.5726649186668,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 240196.9331,
                  units: 'USD',
                },
                distributed: {
                  value: 25805.868964011283,
                  units: 'USD',
                },
                total: {
                  value: 250038.37472892995,
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
      projects: [
        {
          project: 'OpenShift Container Platform',
          values: [
            {
              date: '2022-04',
              project: 'OpenShift Container Platform',
              source_uuid: ['7b2cf7da-d494-4f4d-b640-f9fa57a0fe1c', 'a99443de-af6d-4b4b-a1d9-fdeea529606d'],
              clusters: ['OpenShift on AWS - Nise Populator', 'OpenShift on GCP - Nise Populator'],
              infrastructure: {
                raw: {
                  value: 2939.9514813845437,
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
                  value: 2939.9514813845437,
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
                  value: 28944,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 22944,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 2939.9514813845437,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 28944,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 23883.9514813845435,
                  units: 'USD',
                },
              },
            },
          ],
        },
        {
          project: 'Insights for RHEL',
          values: [
            {
              date: '2022-04',
              project: 'Insights for RHEL',
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
                  value: 256.11350541913017,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 221546.3948,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 221596.50830541913,
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
                  value: 221436.54,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 221436.54,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 256.11350541913017,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 22382.9348,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 22433.04830541913,
                  units: 'USD',
                },
              },
            },
          ],
        },
        {
          project: 'Ansible Engine',
          values: [
            {
              date: '2022-04',
              project: 'Ansible Engine',
              source_uuid: ['7b2cf7da-d494-4f4d-b640-f9fa57a0fe1c', 'a99443de-af6d-4b4b-a1d9-fdeea529606d'],
              clusters: ['OpenShift on AWS - Nise Populator', 'OpenShift on GCP - Nise Populator'],
              infrastructure: {
                raw: {
                  value: 22179.70350866113299,
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
                  value: 22179.70350866113299,
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
                  value: 22312.64,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 22312.64,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 22179.70350866113299,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 22312.64,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 22432.343508661133,
                  units: 'USD',
                },
              },
            },
          ],
        },
        {
          project: 'Others',
          values: [
            {
              date: '2022-04',
              project: 'Others',
              source_uuid: [
                'a99443de-af6d-4b4b-a1d9-fdeea529606d',
                '1899fc34-7096-47d6-82d8-e371268530b1',
                '7b2cf7da-d494-4f4d-b640-f9fa57a0fe1c',
                'ae7cd5c5-b6b8-4059-966d-0548287cb609',
              ],
              clusters: [
                'OpenShift on GCP - Nise Populator',
                'OpenShift on AWS - Nise Populator',
                'OpenShift on Azure - Nise Populator',
                'OpenShift on OpenStack - Nise Populator',
              ],
              infrastructure: {
                raw: {
                  value: 2883.3144454081793,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 2218303.2550666666,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 2218586.569512074846,
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
                  value: 2210268.57,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 2210268.57,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 2883.3144454081793,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 222571.825066666668,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 222855.139512074846,
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
      projects: [
        {
          project: 'OpenShift Container Platform',
          values: [
            {
              date: '2022-05',
              project: 'OpenShift Container Platform',
              source_uuid: ['7b2cf7da-d494-4f4d-b640-f9fa57a0fe1c', 'a99443de-af6d-4b4b-a1d9-fdeea529606d'],
              clusters: ['OpenShift on AWS - Nise Populator', 'OpenShift on GCP - Nise Populator'],
              infrastructure: {
                raw: {
                  value: 2839.9514813845437,
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
                  value: 2839.9514813845437,
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
                  value: 27944,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 27944,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 2839.9514813845437,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 26944,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 23683.9514813845435,
                  units: 'USD',
                },
              },
            },
          ],
        },
        {
          project: 'Insights for RHEL',
          values: [
            {
              date: '2022-05',
              project: 'Insights for RHEL',
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
                  value: 254.11350541913017,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 221346.3948,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 221396.50830541913,
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
                  value: 221236.54,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 221236.54,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 254.11350541913017,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 22182.9348,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 22233.04830541913,
                  units: 'USD',
                },
              },
            },
          ],
        },
        {
          project: 'Ansible Engine',
          values: [
            {
              date: '2022-05',
              project: 'Ansible Engine',
              source_uuid: ['7b2cf7da-d494-4f4d-b640-f9fa57a0fe1c', 'a99443de-af6d-4b4b-a1d9-fdeea529606d'],
              clusters: ['OpenShift on AWS - Nise Populator', 'OpenShift on GCP - Nise Populator'],
              infrastructure: {
                raw: {
                  value: 22149.70350866113299,
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
                  value: 22149.70350866113299,
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
                  value: 22012.64,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 22012.64,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 22149.70350866113299,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 22012.64,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 22132.343508661133,
                  units: 'USD',
                },
              },
            },
          ],
        },
        {
          project: 'Others',
          values: [
            {
              date: '2022-05',
              project: 'Others',
              source_uuid: [
                'a99443de-af6d-4b4b-a1d9-fdeea529606d',
                '1899fc34-7096-47d6-82d8-e371268530b1',
                '7b2cf7da-d494-4f4d-b640-f9fa57a0fe1c',
                'ae7cd5c5-b6b8-4059-966d-0548287cb609',
              ],
              clusters: [
                'OpenShift on GCP - Nise Populator',
                'OpenShift on AWS - Nise Populator',
                'OpenShift on Azure - Nise Populator',
                'OpenShift on OpenStack - Nise Populator',
              ],
              infrastructure: {
                raw: {
                  value: 2285.3144454081793,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 2214303.255066666667,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 2214586.569512074846,
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
                  value: 24468.57,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 24468.57,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 2303.3144454081793,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 2218571.825066666668,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 2218855.139512074846,
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
      projects: [
        {
          project: 'OpenShift Container Platform',
          values: [
            {
              date: '2022-06',
              project: 'OpenShift Container Platform',
              source_uuid: ['7b2cf7da-d494-4f4d-b640-f9fa57a0fe1c', 'a99443de-af6d-4b4b-a1d9-fdeea529606d'],
              clusters: ['OpenShift on AWS - Nise Populator', 'OpenShift on GCP - Nise Populator'],
              infrastructure: {
                raw: {
                  value: 2339.9514813845437,
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
                  value: 2339.9514813845437,
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
                  value: 22944,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 22944,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 2339.9514813845437,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 22944,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 23283.9514813845435,
                  units: 'USD',
                },
              },
            },
          ],
        },
        {
          project: 'Insights for RHEL',
          values: [
            {
              date: '2022-06',
              project: 'Insights for RHEL',
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
                  value: 250.11350541913017,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 2946.3948,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 2996.5083054191301,
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
                  value: 2836.54,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 2836.54,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 250.11350541913017,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 221782.9348,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 221833.0483054191302,
                  units: 'USD',
                },
              },
            },
          ],
        },
        {
          project: 'Ansible Engine',
          values: [
            {
              date: '2022-06',
              project: 'Ansible Engine',
              source_uuid: ['7b2cf7da-d494-4f4d-b640-f9fa57a0fe1c', 'a99443de-af6d-4b4b-a1d9-fdeea529606d'],
              clusters: ['OpenShift on AWS - Nise Populator', 'OpenShift on GCP - Nise Populator'],
              infrastructure: {
                raw: {
                  value: 22119.70350866113299,
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
                  value: 22119.70350866113299,
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
                  value: 221712.64,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 221712.64,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 22119.70350866113299,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 221712.64,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 221832.343508661133,
                  units: 'USD',
                },
              },
            },
          ],
        },
        {
          project: 'Others',
          values: [
            {
              date: '2022-06',
              project: 'Others',
              source_uuid: [
                'a99443de-af6d-4b4b-a1d9-fdeea529606d',
                '1899fc34-7096-47d6-82d8-e371268530b1',
                '7b2cf7da-d494-4f4d-b640-f9fa57a0fe1c',
                'ae7cd5c5-b6b8-4059-966d-0548287cb609',
              ],
              clusters: [
                'OpenShift on GCP - Nise Populator',
                'OpenShift on AWS - Nise Populator',
                'OpenShift on Azure - Nise Populator',
                'OpenShift on OpenStack - Nise Populator',
              ],
              infrastructure: {
                raw: {
                  value: 2283.3144454081793,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 2212303.255066666667,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 2212586.569512074846,
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
                  value: 24268.57,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 24268.57,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 2283.3144454081793,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 2216571.825066666668,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 2216855.139512074846,
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
          project: 'OpenShift Container Platform',
          values: [
            {
              date: '2022-07',
              project: 'OpenShift Container Platform',
              source_uuid: ['7b2cf7da-d494-4f4d-b640-f9fa57a0fe1c', 'a99443de-af6d-4b4b-a1d9-fdeea529606d'],
              clusters: ['OpenShift on AWS - Nise Populator', 'OpenShift on GCP - Nise Populator'],
              infrastructure: {
                raw: {
                  value: 26014.457048413701,
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
                  value: 26014.457048413701,
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
                  value: 2210448,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 2210448,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 26014.457048413701,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 2210448,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 2216462.4570484137,
                  units: 'USD',
                },
              },
            },
          ],
        },
        {
          project: 'Insights for RHEL',
          values: [
            {
              date: '2022-07',
              project: 'Insights for RHEL',
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
                  value: 221329.1420881835122,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 23358.67285,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 24687.814938183512,
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
                  value: 23068.53,
                  units: 'USD',
                },
                distributed: {
                  value: 2374.20754778865626,
                  units: 'USD',
                },
                total: {
                  value: 23442.7375477886562,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 221329.1420881835122,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 26427.20285,
                  units: 'USD',
                },
                distributed: {
                  value: 2374.20754778865626,
                  units: 'USD',
                },
                total: {
                  value: 28130.552485972168,
                  units: 'USD',
                },
              },
            },
          ],
        },
        {
          project: 'Ansible Engine',
          values: [
            {
              date: '2022-07',
              project: 'Ansible Engine',
              source_uuid: ['7b2cf7da-d494-4f4d-b640-f9fa57a0fe1c', 'a99443de-af6d-4b4b-a1d9-fdeea529606d'],
              clusters: ['OpenShift on AWS - Nise Populator', 'OpenShift on GCP - Nise Populator'],
              infrastructure: {
                raw: {
                  value: 22734.911686451038,
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
                  value: 22734.911686451038,
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
                  value: 26088.5,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 26088.5,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 22734.911686451038,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 26088.5,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 28823.411686451038,
                  units: 'USD',
                },
              },
            },
          ],
        },
        {
          project: 'Others',
          values: [
            {
              date: '2022-07',
              project: 'Others',
              source_uuid: [
                'a99443de-af6d-4b4b-a1d9-fdeea529606d',
                '1899fc34-7096-47d6-82d8-e371268530b1',
                '7b2cf7da-d494-4f4d-b640-f9fa57a0fe1c',
                'ae7cd5c5-b6b8-4059-966d-0548287cb609',
              ],
              clusters: [
                'OpenShift on GCP - Nise Populator',
                'OpenShift on AWS - Nise Populator',
                'OpenShift on Azure - Nise Populator',
                'OpenShift on OpenStack - Nise Populator',
              ],
              infrastructure: {
                raw: {
                  value: 26766.332394984845,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 243663.150598387096,
                  units: 'USD',
                },
                distributed: {
                  value: 221200,
                  units: 'USD',
                },
                total: {
                  value: 251629.482993371945,
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
                  value: 2215234.56,
                  units: 'USD',
                },
                distributed: {
                  value: 24625.7924522113435,
                  units: 'USD',
                },
                total: {
                  value: 2219860.352452211344,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 26766.332394984845,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 258897.71059838709,
                  units: 'USD',
                },
                distributed: {
                  value: 25825.7924522113435,
                  units: 'USD',
                },
                total: {
                  value: 271489.83544558329,
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
          project: 'OpenShift Container Platform',
          values: [
            {
              date: '2022-08',
              project: 'OpenShift Container Platform',
              source_uuid: ['7b2cf7da-d494-4f4d-b640-f9fa57a0fe1c', 'a99443de-af6d-4b4b-a1d9-fdeea529606d'],
              clusters: ['OpenShift on AWS - Nise Populator', 'OpenShift on GCP - Nise Populator'],
              infrastructure: {
                raw: {
                  value: 23392.2000140326872,
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
                  value: 23392.2000140326872,
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
                  value: 27136,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 27136,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 23392.2000140326872,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 27136,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 2210528.200014032687,
                  units: 'USD',
                },
              },
            },
          ],
        },
        {
          project: 'Insights for RHEL',
          values: [
            {
              date: '2022-08',
              project: 'Insights for RHEL',
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
                  value: 2797.1670545550679,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 22293.9787,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 23091.145754555068,
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
                  value: 22064.61,
                  units: 'USD',
                },
                distributed: {
                  value: 2394.13103598871703,
                  units: 'USD',
                },
                total: {
                  value: 22458.741035988717,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 2797.1670545550679,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 24358.5887,
                  units: 'USD',
                },
                distributed: {
                  value: 2394.13103598871703,
                  units: 'USD',
                },
                total: {
                  value: 25549.886790543785,
                  units: 'USD',
                },
              },
            },
          ],
        },
        {
          project: 'Ansible Engine',
          values: [
            {
              date: '2022-08',
              project: 'Ansible Engine',
              source_uuid: ['7b2cf7da-d494-4f4d-b640-f9fa57a0fe1c', 'a99443de-af6d-4b4b-a1d9-fdeea529606d'],
              clusters: ['OpenShift on AWS - Nise Populator', 'OpenShift on GCP - Nise Populator'],
              infrastructure: {
                raw: {
                  value: 221619.181524760065,
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
                  value: 221619.18152476,
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
                  value: 24136.77,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 24136.77,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 221619.18152476,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 24136.77,
                  units: 'USD',
                },
                distributed: {
                  value: 0,
                  units: 'USD',
                },
                total: {
                  value: 25755.951524760065,
                  units: 'USD',
                },
              },
            },
          ],
        },
        {
          project: 'Others',
          values: [
            {
              date: '2022-08',
              project: 'Others',
              source_uuid: [
                'a99443de-af6d-4b4b-a1d9-fdeea529606d',
                '1899fc34-7096-47d6-82d8-e371268530b1',
                '7b2cf7da-d494-4f4d-b640-f9fa57a0fe1c',
                'ae7cd5c5-b6b8-4059-966d-0548287cb609',
              ],
              clusters: [
                'OpenShift on GCP - Nise Populator',
                'OpenShift on AWS - Nise Populator',
                'OpenShift on Azure - Nise Populator',
                'OpenShift on OpenStack - Nise Populator',
              ],
              infrastructure: {
                raw: {
                  value: 24035.57266491866,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 229821.9931,
                  units: 'USD',
                },
                distributed: {
                  value: 221200,
                  units: 'USD',
                },
                total: {
                  value: 235057.565764918,
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
                  value: 2210374.94,
                  units: 'USD',
                },
                distributed: {
                  value: 24605.868964011283,
                  units: 'USD',
                },
                total: {
                  value: 2214980.808964011,
                  units: 'USD',
                },
              },
              cost: {
                raw: {
                  value: 24035.57266491866,
                  units: 'USD',
                },
                markup: {
                  value: 0,
                  units: 'USD',
                },
                usage: {
                  value: 240196.9331,
                  units: 'USD',
                },
                distributed: {
                  value: 25805.868964011283,
                  units: 'USD',
                },
                total: {
                  value: 250038.37472892995,
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
