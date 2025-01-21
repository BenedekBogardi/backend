import { faker } from "@faker-js/faker";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    for (let i=0; i<20; i++){
        const tfName=faker.person.firstName;
        const tlName=faker.person.lastName;
        await prisma.teacher.create({
            data: {
                name: `${tfName} ${tlName}`,
                subjectTeacher: faker.helpers.arrayElement([
                    "Matematika",
                    "Történelem",
                    "Kémia",
                    "Informatika",
                    "Irodalom",
                ]),
                hourlyRate: faker.number.int({min: 2000, max: 10000}),
                email: `${tfName}.${tlName}@citromail.com`,
                numberOfStudents: 0,
                rating: faker.number.int({min: 1, max: 10}),
            }
        });

        await prisma.student.create({
            data: {
                name: faker.person.fullName(),
                ageGroup: faker.helpers.arrayElement([
                    "alsos",
                    "felsos",
                    "kozep_isk",
                    "felso_okt",
                ]),
                subjectStudent: "nincs felvett tantárgy"
            }
        });

        await prisma.assignment.create({
            data: {
                subject: faker.helpers.arrayElement([
                    "Matematika",
                    "Történelem",
                    "Kémia",
                    "Informatika",
                    "Irodalom",
                ]),
                ageGroup: faker.helpers.arrayElement([
                    "alsos",
                    "felsos",
                    "kozep_isk",
                    "felso_okt",
                ]),
                assignments: faker.lorem.lines(),
            }
        });
    }
}

main()
  .then(async () => {
    console.log('Database seeded successfully!');
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  });