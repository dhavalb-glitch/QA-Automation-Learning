import { useState } from 'react';

type ProviderFormProps = {
  mode?: 'add' | 'edit';
  initialData?: {
    name: string;
    type: string;
    email: string;
    bankAccount: string;
    routingReference: string;
  };
};

export default function ProviderForm({ mode = 'add', initialData }: ProviderFormProps) {
  const [name, setName] = useState(initialData?.name || '');
  const [type, setType] = useState(initialData?.type || '');
  const [email, setEmail] = useState(initialData?.email || '');
  const [bankAccount, setBankAccount] = useState(initialData?.bankAccount || '');
  const [routingReference, setRoutingReference] = useState(initialData?.routingReference || '');

  const [submitted, setSubmitted] = useState(false);

  const isValid = name && type && email && bankAccount && routingReference;

  return (
    <div>
      <h2>{mode === 'add' ? 'Add Provider' : 'Edit Provider'}</h2>

      <input placeholder="Provider Name" value={name} onChange={(e) => setName(e.target.value)} />

      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="">Select Type</option>
        <option value="Physician">Physician</option>
        <option value="Facility">Facility</option>
        <option value="Labs">Labs</option>
      </select>

      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />

      <input
        placeholder="Bank Account Number"
        value={bankAccount}
        onChange={(e) => setBankAccount(e.target.value)}
      />

      <input
        placeholder="Routing Reference Number"
        value={routingReference}
        onChange={(e) => setRoutingReference(e.target.value)}
      />

      <button onClick={() => setSubmitted(true)}>
        {mode === 'add' ? 'Add Provider' : 'Save Changes'}
      </button>

      {submitted && !isValid && <p>All mandatory fields are required</p>}

      {submitted && isValid && <p>Provider saved successfully</p>}
    </div>
  );
}
