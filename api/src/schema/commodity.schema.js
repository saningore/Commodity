const z = require("zod")

exports.commoditySchema = z.object({
    body: z.object({
        commodity: z.string().trim().nonempty(),
        market: z.string().trim().nonempty(),
        start_date: z.string().trim().regex(/^\d{4}-\d{2}-\d{2}$/),
        end_date: z.string().trim().regex(/^\d{4}-\d{2}-\d{2}$/),
    }, {}),
});
