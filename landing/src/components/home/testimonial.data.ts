import type { Testimonial } from '@/interfaces/testimonial'

export const data: Array<Testimonial> = [
  {
    id: 1,
    title: 'Stages of the public procurement procedure',
    content:
      'Each public procurement takes place through several stages. The methodology follows all stages of the public procurement procedure: public procurement planning preparation of tender documentation submission and evaluation of bides contracting. Contrat implementation. It also monitors public procurement  appeals (legal protection) and possible cancellations of public procurement procedures. ',
    user: {
      id: 1,
      name: 'Luis Sera',
      professional: 'Market research expert',
      photo: '1.jpg',
    },
  },
  {
    id: 2,
    title: 'Risk indicators!',
    content:
      'Ilegal publc procurements, non-transparent, discriinatory unnecessary public procurements are detected and identified using sevin risk indicators. A separate indicator of risk is defined for each stage of the public procurement procecure.',
    user: {
      id: 1,
      name: 'Alexander Rossi',
      professional: 'Procurement Risk Management Specialist',
      photo: '2.jpg',
    },
  },
  {
    id: 3,
    title: 'Risk calculation',
    content:
      'Follow tenders portal calculates the degree of risk of the pubic procurement procedure using a software program. The program calculates the degree of risk of public procurement in each stage of the procedure, and the total degree of risk of public procurements..',
    user: {
      id: 1,
      name: 'Noah Patel',
      professional: 'Public Procurement Risk Analyst',
      photo: '3.jpg',
    },
  },
  {
    id: 4,
    title: 'Data sources !',
    content:
      'The key sources are data and documents of contractual authorities and bidders, and other  relevant institutions which are availabile on the Tender Pro portal, as well as documents and data of public interest that are subject to the provisions of the law on free access to information..',
    user: {
      id: 1,
      name: 'Diana Jordan',
      professional: 'Tender Data Analysts',
      photo: '4.jpg',
    },
  },
  {
    id: 5,
    title: 'Legality and good practices',
    content:
      'The methodology makes it possible to discover whether procurement  is carried out in accordance  with the law, whether it is transparent, corrupt, necessary... The methodology makes it posssible to: Monitoring the legality of the procuremet monitoring whether the procurement, wich implies the procurement by which, with timely and rational planning and implementation of the procedure, goods services of works of appropriate quality where procured, under the most favorable conditions and in the interest of the end users. .',
    user: {
      id: 1,
      name: 'Sophia Chen',
      professional: 'Procurement Compliance Specialist',
      photo: '5.jpg',
    },
  },
]
