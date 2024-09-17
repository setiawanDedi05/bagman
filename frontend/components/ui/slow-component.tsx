// app/components/SlowComponent.tsx
async function SlowComponent() {
  // Simulasi fetching data dengan delay
  await new Promise((resolve) => setTimeout(resolve, 3000)); // 3 detik delay

  return (
    <div>
      <h1>Data successfully loaded!</h1>
    </div>
  );
}

export default SlowComponent;
