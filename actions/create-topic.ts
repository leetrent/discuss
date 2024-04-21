'use server';

export async function createTopic(formData: FormData) {
    const name = formData.get("name");
    const description = formData.get("description");

    console.log("createTopic() => (name):", name);
    console.log("createTopic() => (description):", description);
}

// TODO: Revalidate the home page after creating a topic.