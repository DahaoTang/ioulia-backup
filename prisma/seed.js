const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const userId = "user_2ZF9bKsY6OaN2G0krChQppbBFCq"; // Define the user ID constant

async function main() {
	const recordsData = [
		{
			userId,
			level: 1,
			title: "Weekend Plans",
			content: "Hey, let's catch up this weekend! Any plans?",
		},
		{
			userId,
			level: 2,
			title: "Favorite Movie",
			content: "I watched an amazing movie last night, you have to see it!",
		},
		{
			userId,
			level: 0,
			title: "Work Update",
			content: "Work is so hectic these days, I need a break.",
		},
		{
			userId,
			level: 1,
			title: "Travel Plans",
			content: "I'm thinking of going on a road trip, any suggestions?",
		},
		{
			userId,
			level: 2,
			title: "New Recipe",
			content: "I tried a new recipe and it turned out delicious!",
		},
		{
			userId,
			level: 0,
			title: "Book Recommendation",
			content: "I just finished an amazing book, you should read it.",
		},
		{
			userId,
			level: 1,
			title: "Fitness Goals",
			content: "I've started a new workout routine, feeling great!",
		},
		{
			userId,
			level: 2,
			title: "Family Update",
			content: "Spent the weekend with family, it was so much fun.",
		},
		{
			userId,
			level: 0,
			title: "Hobby Talk",
			content: "I'm trying out painting, it's a relaxing hobby.",
		},
		{
			userId,
			level: 1,
			title: "Travel Memories",
			content: "Remember that trip we took a few years ago? Good times!",
		},
	];

	// Create 10 records
	for (const recordData of recordsData) {
		await prisma.record.create({
			data: recordData,
		});
	}
}

main()
	.catch((e) => {
		throw e;
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
