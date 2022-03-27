import { assocPath } from 'ramda';
import { ActionFunction, Form, useActionData } from 'remix';
import { allWords } from '~/utils/words';

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const rawData = Array.from(formData.entries()).reduce((acc, cur) => {
    const [key, value] = cur;
    return assocPath(key.split('.'), value.toString().toLowerCase(), acc);
  }, {}) as any;

  const words = allWords
    .filter((word) => {
      if (rawData.notAllowed.split('').some((c: string) => word.includes(c))) return false;
      for (let index = 0; index < 5; index++) {
        const char = rawData[index].char;
        if (char) {
          if (!word.includes(char)) return false;
          if (rawData[index]['0'] && word[0] === char) return false;
          if (rawData[index]['1'] && word[1] === char) return false;
          if (rawData[index]['2'] && word[2] === char) return false;
          if (rawData[index]['3'] && word[3] === char) return false;
          if (rawData[index]['4'] && word[4] === char) return false;
        }
      }
      return true;
    })
    .sort((a, b) => a.localeCompare(b));

  return { words };
};

export default function Index() {
  const data = useActionData();

  // Add Character
  // Input for Character, only allow characters from listOfChars
  // 5 Checkboxes to mark position where the character is not

  return (
    <div className="bg-white py-8 px-4 sm:px-6 lg:px-8 lg:py-16">
      <div className="relative mx-auto max-w-xl">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Worlde Calculator</h2>
          <p className="mt-4 text-lg leading-6 text-gray-500">
            Type in characters you know and select at which places they can't be.
          </p>
        </div>
        <div className="mt-8 xs:mt-12">
          <Form method="post" className="flex flex-col gap-y-6">
            <div className="flex flex-col gap-y-2 xxs:gap-y-3 xs:gap-y-4">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="flex items-end gap-1 xxs:gap-2">
                    <div className="mt-1 w-full shrink">
                      <input
                        type="text"
                        name={`${i}.char`}
                        placeholder="A-Z"
                        maxLength={1}
                        autoCorrect="off"
                        className="block w-full rounded-md border-gray-300 py-2 px-3 uppercase shadow-sm placeholder-shown:normal-case focus:border-indigo-500 focus:ring-indigo-500 xxs:py-3 xxs:px-4"
                      />
                    </div>
                    {Array(5)
                      .fill(0)
                      .map((_, j) => (
                        <label key={j}>
                          <input type="checkbox" name={`${i}.${j}`} className="peer hidden" />
                          <span className="box-content flex h-10 w-10 cursor-pointer items-center justify-center rounded-md border border-gray-300 text-gray-300 peer-checked:border-red-400 peer-checked:bg-red-400 peer-checked:text-white xxs:h-12 xxs:w-12">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="block h-8 w-8"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </span>
                        </label>
                      ))}
                  </div>
                ))}
            </div>
            <input
              type="text"
              name="notAllowed"
              id="notAllowed"
              autoCorrect="off"
              placeholder="Type in not allowed characters"
              className="block w-full rounded-md border-gray-300 py-3 px-4 uppercase shadow-sm placeholder-shown:normal-case focus:border-indigo-500 focus:ring-indigo-500"
            />
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Get Words
            </button>
          </Form>
        </div>
        {!!data?.words?.length && (
          <div className="mt-8 xs:mt-12">
            <h3 className="text-lg font-medium text-gray-900">Words</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {data.words.map((word: string) => (
                <div key={word} className="flex items-center uppercase">
                  {word}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
