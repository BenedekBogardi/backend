import { faker } from "@faker-js/faker";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const subjects = ["Matematika", "Történelem", "Kémia", "Informatika", "Irodalom"];
    const assignments = [];

    for (let i=0; i<10; i++){
      for (const subject of subjects) {
        let assignment = await prisma.assignment.findFirst({
          where: { subject },
        });
    
        if (!assignment) {
          assignment = await prisma.assignment.create({
            data: {
              subject: subject,
              ageGroup: faker.helpers.arrayElement(["alsos", "felsos", "kozep_isk", "felso_okt"]),
              assignments: faker.lorem.lines(),
            },
          });
          console.log(`Created assignment: ${JSON.stringify(assignment)}`);
        } else {
          console.log(`Found existing assignment: ${JSON.stringify(assignment)}`);
        }
    
        assignments.push(assignment);
      }
    }

    for (let i = 0; i < 20; i++) {
        const randomAssignment = faker.helpers.arrayElement(assignments);

        const fName=faker.person.firstName;
        const lName=faker.person.lastName;

        const teacher = await prisma.teacher.create({
            data: {
                name: `${faker.person.firstName()} ${faker.person.lastName()}`,
                subjectTeacher: randomAssignment.subject,
                hourlyRate: faker.number.int({ min: 2000, max: 10000 }),
                email: `${fName}.${lName}@citromail.com`,
                numberOfStudents: 0,
                rating: faker.number.int({ min: 1, max: 10 }),
                assignmentId: randomAssignment.id,
            },
        });
    }

    for (let i = 0; i < 20; i++) {
        const randomAssignment = faker.helpers.arrayElement(assignments);

        const student = await prisma.student.create({
            data: {
                name: faker.person.fullName(),
                ageGroup: faker.helpers.arrayElement(["alsos", "felsos", "kozep_isk", "felso_okt"]),
                assignmentId: randomAssignment.id,
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
