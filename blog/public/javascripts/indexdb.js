function testIndexDB_MDN(dbName, version) {
  // This is what our customer data looks like.
  const customerData = [
    { ssn: "444-44-4444", name: "Bill", age: 35, email: "bill@company.com" },
    { ssn: "555-55-5555", name: "Donna", age: 32, email: "donna@home.org" },
  ];
  // USO de la BBDD para ADD datos
  const request = indexedDB.open(dbName, version);

  request.onerror = (event) => {
    console.error(`Database error: ${event.target.errorCode}`);
  };
  request.onupgradeneeded = (event) => {
    console.log("onupgradeneeded");
    const db = event.target.result;

    // Create an objectStore to hold information about our customers. We're
    // going to use "ssn" as our key path because it's guaranteed to be
    // unique - or at least that's what I was told during the kickoff meeting.
    const objectStore = db.createObjectStore("customers", { keyPath: "ssn" });

    // Create an index to search customers by name. We may have duplicates
    // so we can't use a unique index.
    objectStore.createIndex("name", "name", { unique: false });

    // Create an index to search customers by email. We want to ensure that
    // no two customers have the same email, so use a unique index.
    objectStore.createIndex("email", "email", { unique: true });

    // Use transaction oncomplete to make sure the objectStore creation is
    // finished before adding data into it.
    objectStore.transaction.oncomplete = (event) => {
      // Store values in the newly created objectStore.
      const customerObjectStore = db
        .transaction("customers", "readwrite")
        .objectStore("customers");
      customerData.forEach((customer) => {
        customerObjectStore.add(customer);
      });
    };
  };
  request.onsuccess = (event) => {
    const db = event.target.result;
    const transaction = db.transaction(["customers"], "readwrite");
    transaction.oncomplete = (event) => {
      console.log("All done!");
    };

    transaction.onerror = (event) => {
      // Don't forget to handle errors!
    };

    const objectStore = transaction.objectStore("customers");
    customerData.forEach((customer) => {
      const request = objectStore.add(customer);
      request.onsuccess = (event) => {
        // event.target.result === customer.ssn;
      };
    });
  };

  // USO de la BBDD para READ datos
  const requestRead = indexedDB.open(dbName, version);
  requestRead.onsuccess = (event) => {
    const db = event.target.result;
    db
      .transaction("customers")
      .objectStore("customers")
      .get("444-44-4444").onsuccess = (event) => {
      console.log(`Name for SSN 444-44-4444 is ${event.target.result}`);
    };
  };

  // USO de la BBDD para DELETE datos
  const requestDelete = indexedDB.open(dbName, version);
  requestDelete.onsuccess = (event) => {
    const db = event.target.result;

    const request = db
      .transaction(["customers"], "readwrite")
      .objectStore("customers")
      .delete("444-44-4444");
    request.onsuccess = (event) => {
      console.log("DELETED!");
    };
  };
}
