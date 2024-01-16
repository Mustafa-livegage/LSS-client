import {z} from 'zod';

const schema = z.object({
    loan_number: z.number(),
    note_date: z.string(),
    note_rate: z.number(),
    boarding_date: z.string(),
    upb_amount: z.number(),
    current_rate: z.number(),
    pmt_due_date: z.string(),
    principal_intrest: z.number(),
    tax_insurance: z.number(),
    pmt_amount: z.number(),
    name: z.string(),
    ppr: z.string()
  });

  