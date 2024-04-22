'use server';
import { z } from 'zod';

const createTopicsSchema = z.object({
    name: z.string().min(3).regex(/^[a-z-]+$/, {message: "Must be lowercase latters or dashes wihout spaces"}),
    description: z.string().min(10)
});

export async function createTopic(formData: FormData) {
    const result = createTopicsSchema.safeParse({
        name: formData.get("name"),
        description: formData.get("description")

    });
    if (!result.success) {
        console.log(result.error.flatten().fieldErrors);
    }

}

// TODO: Revalidate the home page after creating a topic.