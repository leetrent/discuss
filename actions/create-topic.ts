'use server';
import { z } from 'zod';
import { auth } from '@/auth';

const createTopicsSchema = z.object({
    name: z.string().min(3).regex(/^[a-z-]+$/, {message: "Must be lowercase latters or dashes wihout spaces"}),
    description: z.string().min(10)
});

interface CreateTopicFormState {
    errors: {
        name?: string[];
        description?: string[];
        _form?: string[];
    };
};

export async function createTopic(
    formState: CreateTopicFormState, 
    formData: FormData
): Promise<CreateTopicFormState> {
    
    const result = createTopicsSchema.safeParse({
        name: formData.get("name"),
        description: formData.get("description")

    });

    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors
        }
    }

    const session = await auth();
    if (!session || !session.user) {
        return {
            errors: {
                _form: ['You must be signed in to create a topic.']
            }
        };
    }

    return {
        errors: {}
    };

}

// TODO: Revalidate the home page after creating a topic.