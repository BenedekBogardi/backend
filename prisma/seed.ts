import { faker } from "@faker-js/faker";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const subjects = ["Matematika", "Történelem", "Kémia", "Informatika", "Irodalom"];
    const assignments = [];
    const r=Math.floor(Math.random()*100);

    for (let i = 0; i < 100; i++) {
      const randomSubject = faker.helpers.arrayElement(subjects); 
      const assignment = await prisma.assignment.create({
          data: {
              subject: randomSubject,
              ageGroup: faker.helpers.arrayElement(["alsos", "felsos", "kozep_isk", "felso_okt"]),
              assignments: faker.lorem.lines(),
          },
      });
      assignments.push(assignment); 
    }

    for (let i = 0; i < 20; i++) {
        const randomAssignment = faker.helpers.arrayElement(assignments);

        const fName = faker.person.firstName();
        const lName = faker.person.lastName();

        await prisma.teacher.create({
            data: {
                name: `${fName} ${lName}`,
                subjectTeacher: randomAssignment.subject,
                hourlyRate: faker.number.int({ min: 2000, max: 10000 }),
                email: `${fName.toLowerCase()}.${lName.toLowerCase()}@citromail.com`,
                numberOfStudents: 0,
                rating: faker.number.int({ min: 1, max: 10 }),
                assignmentId: randomAssignment.id,
                password: "alma"
            },
        });
    }

    for (let i = 0; i < 20; i++) {
        const randomAssignment = faker.helpers.arrayElement(assignments);

        await prisma.student.create({
            data: {
                name: faker.person.fullName(),
                ageGroup: faker.helpers.arrayElement(["alsos", "felsos", "kozep_isk", "felso_okt"]),
                assignmentId: randomAssignment.id,
                password: faker.lorem.word()
            },
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
